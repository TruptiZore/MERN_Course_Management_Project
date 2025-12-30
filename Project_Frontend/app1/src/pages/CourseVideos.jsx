import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllVideos } from '../services/video.service';
import StudentNavbar from '../components/StudentNavbar';

function CourseVideos() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    if (!course) { navigate('/my-courses'); return; }

    const loadVideos = async () => {
      const token = sessionStorage.getItem('token');
      const result = await getAllVideos(token);
      if (result.status === 'success') {
        // Filter videos for this specific course
        const courseVideos = result.data.filter(v => v.course_id === course.id);
        setVideos(courseVideos);
      }
    };
    loadVideos();
  }, [course, navigate]);

  const extractVideoId = (url) => {
     // Simple parser for YouTube IDs
     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
     const match = url?.match(regExp);
     return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div>
      <StudentNavbar />
      <div className='container-fluid'>
         {/* Page 6-like Header */}
         <div className='bg-light p-3 mb-3 border-bottom'>
            <button onClick={() => navigate('/my-courses')} className='btn btn-outline-secondary btn-sm mb-2'>&larr; Back to Courses</button>
            <h4>{course?.title} - Videos</h4>
            <span className='text-muted small'>
                Start: {course?.start_date?.split('T')[0]} | End: {course?.end_date?.split('T')[0]}
            </span>
         </div>

         <div className='row'>
            {/* Video Player Section */}
            <div className='col-md-8'>
                {currentVideo ? (
                    <div className='card shadow-sm p-2'>
                        <div className="ratio ratio-16x9 mb-3">
                            <iframe 
                                src={`https://www.youtube.com/embed/${extractVideoId(currentVideo.url)}`} 
                                title="Video Player" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <h4>{currentVideo.title}</h4>
                        <p>{currentVideo.description}</p>
                        <p className='text-muted small'>Added: {new Date().toLocaleDateString()}</p>
                    </div>
                ) : (
                    <div className='alert alert-secondary text-center p-5'>
                        <h5>Select a video to start learning</h5>
                        <p>Choose from the list on the right</p>
                    </div>
                )}
            </div>

            {/* Video List Section (Page 5) */}
            <div className='col-md-4'>
                <div className='list-group'>
                    {videos.map((video) => (
                        <button 
                            key={video.id} 
                            onClick={() => setCurrentVideo(video)}
                            className={`list-group-item list-group-item-action ${currentVideo?.id === video.id ? 'active' : ''}`}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <strong>{video.title}</strong>
                            </div>
                            <small className='text-muted'>Click to play</small>
                        </button>
                    ))}
                    {videos.length === 0 && <div className='p-3'>No videos uploaded for this course yet.</div>}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}

export default CourseVideos;