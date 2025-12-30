import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllVideos, deleteVideo } from '../services/video.service';
import AdminNavbar from '../components/AdminNavbar';

function VideoDashboard() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const token = sessionStorage.getItem('token');
    const result = await getAllVideos(token);
    if (result.status === 'success') setVideos(result.data);
  };

  const onDelete = async (id) => {
    if (window.confirm('Delete this video?')) {
      const token = sessionStorage.getItem('token');
      const result = await deleteVideo(id, token);
      if (result.status === 'success') { toast.success('Deleted'); loadVideos(); }
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className='container'>
        <div className='d-flex justify-content-between mb-4'>
            <h2>All Videos</h2>
            <button onClick={() => navigate('/add-video')} className='btn btn-success'>Add Video</button>
        </div>
        <table className='table table-striped shadow-sm'>
          <thead className='table-dark'><tr><th>ID</th><th>Course</th><th>Title</th><th>URL</th><th>Actions</th></tr></thead>
          <tbody>
            {videos.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td><td>{v.course_title}</td><td>{v.title}</td><td>{v.url}</td>
                <td>
                  <button onClick={() => navigate('/update-video', { state: { video: v } })} className='btn btn-sm btn-primary me-2'>Edit</button>
                  <button onClick={() => onDelete(v.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
            {videos.length === 0 && <tr><td colSpan='5' className='text-center'>No videos found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default VideoDashboard;