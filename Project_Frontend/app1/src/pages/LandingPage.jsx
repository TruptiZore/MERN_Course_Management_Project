import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getActiveCourses } from '../services/course.service';
import PublicNavbar from '../components/PublicNavbar';

function LandingPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const result = await getActiveCourses();
    if (result.status === 'success') {
      setCourses(result.data);
    } else {
      toast.error('Failed to load courses');
    }
  };

  const handleViewMore = () => {
    // Since this is a public page, "View More" redirects to Login
    // You could also show a toast: "Please login to view course details"
    navigate('/login');
  };

  return (
    <div>
      <PublicNavbar />
      
      <div className='container'>
        <h2 className='text-center mb-5'>Available Courses</h2>
        
        <div className='row justify-content-center'>
          {courses.map((course) => (
            <div key={course.id} className='col-md-3 mb-4'>
              <div className='card shadow-sm h-100 text-center p-3'>
                
                {/* Image */}
                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '15px' }}>
                    <img 
                      src={course.image_url || `https://ui-avatars.com/api/?name=${course.title}&background=random&size=128`} 
                      alt={course.title}
                      className="img-fluid"
                      style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                </div>
                
                {/* Body */}
                <div className='card-body d-flex flex-column p-0'>
                  <h5 className='card-title fw-bold'>{course.title}</h5>
                  <p className='text-muted small'>Starts on: {course.start_date ? course.start_date.split('T')[0] : 'N/A'}</p>
                  
                  <button 
                    onClick={handleViewMore} 
                    className='btn btn-primary mt-auto w-50 mx-auto fw-bold'
                    style={{ borderRadius: '5px' }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className='text-center mt-5 text-muted'>
                <p>No active courses available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;