// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// // FIXED: Added 'enrollCourse' to imports
// import { getAllCourses, enrollCourse } from '../services/course.service';

// function StudentHome() {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const loadCourses = async () => {
//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }
    
//     const result = await getAllCourses(token);
//     if (result.status === 'success') {
//       setCourses(result.data);
//     } else {
//       toast.error(result.error);
//     }
//   };

//   // NEW FUNCTION: Connects the button to the backend
//   const onEnroll = async (courseId) => {
//     const token = sessionStorage.getItem('token');
//     const result = await enrollCourse(courseId, token);
    
//     if (result.status === 'success') {
//       toast.success('Successfully Enrolled!');
//     } else {
//       // Shows error if already enrolled
//       toast.warning(result.error || 'Enrollment failed');
//     }
//   };

//   const onLogout = () => {
//     sessionStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div className='container mt-5'>
//       <div className='d-flex justify-content-between align-items-center mb-4'>
//         <h2>Available Courses</h2>
//         <button onClick={onLogout} className='btn btn-danger'>Logout</button>
//       </div>

//       <div className='row'>
//         {courses.map((course) => (
//           <div key={course.id} className='col-md-4 mb-4'>
//             <div className='card shadow-lg h-100' style={{ transition: 'transform 0.2s' }}>
              
//               <img 
//                 src={course.image ? course.image : `https://picsum.photos/seed/${course.id}/300/200`} 
//                 className="card-img-top" 
//                 alt={course.title}
//                 style={{ height: '200px', objectFit: 'cover' }} 
//               />
              
//               <div className='card-body d-flex flex-column'>
//                 <h5 className='card-title fw-bold'>{course.title}</h5>
//                 <p className='card-text text-muted' style={{ flexGrow: 1 }}>
//                   {course.description}
//                 </p>
                
//                 <h5 className='text-success fw-bold mb-3'>₹ {course.price}</h5>
                
//                 <div className='d-flex justify-content-between text-secondary small mb-3'>
//                   <span>Start: {course.start_date ? course.start_date.split('T')[0] : 'N/A'}</span>
//                   <span>End: {course.end_date ? course.end_date.split('T')[0] : 'N/A'}</span>
//                 </div>
                
//                 {/* FIXED: Button now calls onEnroll */}
//                 <button 
//                   onClick={() => onEnroll(course.id)} 
//                   className='btn btn-primary w-100 fw-bold'
//                 >
//                   Enroll Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {courses.length === 0 && (
//           <div className='col-12 text-center mt-5'>
//             <h4 className='text-muted'>No courses available yet.</h4>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentHome;













import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllCourses } from '../services/course.service';
import StudentNavbar from '../components/StudentNavbar'; // This imports the Navbar

function StudentHome() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) { navigate('/login'); return; }
      
      const result = await getAllCourses(token);
      if (result.status === 'success') {
        setCourses(result.data);
      } else {
        toast.error(result.error);
      }
    };
    loadCourses();
  }, [navigate]);

  return (
    <div>
      {/* 1. Navbar is added here */}
      <StudentNavbar />
      
      <div className='container mt-4'>
        <h2 className='mb-4'>Available Courses</h2>
        <div className='row'>
          {courses.map((course) => (
            <div key={course.id} className='col-md-3 mb-4'>
              <div className='card shadow-sm h-100 text-center p-3'>
                {/* Image Section */}
                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                      src={course.image_url || `https://ui-avatars.com/api/?name=${course.title}&background=random&size=128`} 
                      alt={course.title}
                      className="img-fluid"
                      style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                </div>
                
                {/* Body Section */}
                <div className='card-body d-flex flex-column'>
                  <h5 className='card-title mt-2'>{course.title}</h5>
                  <p className='text-muted small'>Starts on: {course.start_date ? course.start_date.split('T')[0] : 'N/A'}</p>
                  
                  {/* 2. Changed 'Enroll' button to 'View More' to match the flow */}
                  <button 
                    onClick={() => navigate(`/course-details/${course.id}`, { state: { course } })} 
                    className='btn btn-primary mt-auto w-100'
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentHome;