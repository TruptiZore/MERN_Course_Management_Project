import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';
import AdminNavbar from '../components/AdminNavbar';
import { getAllCourses } from '../services/course.service';

function StudentList() {
  const [allStudents, setAllStudents] = useState([]); 
  const [filteredStudents, setFilteredStudents] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const [selectedCourse, setSelectedCourse] = useState('All'); 

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    try {
      const studentResponse = await axios.get(`${config.BASE_URL}/user/all-students`, { headers: { token } });
      if (studentResponse.data.status === 'success') {
        setAllStudents(studentResponse.data.data);
        setFilteredStudents(studentResponse.data.data); 
      }

      const courseResponse = await getAllCourses(token);
      if (courseResponse.status === 'success') {
        setCourses(courseResponse.data);
      }

    } catch (error) { 
      toast.error('Error fetching data'); 
    }
  };

  const handleFilterChange = (e) => {
    const courseTitle = e.target.value;
    setSelectedCourse(courseTitle);

    if (courseTitle === 'All') {
      setFilteredStudents(allStudents);
    } else {
      const filtered = allStudents.filter(s => s.course_name === courseTitle);
      setFilteredStudents(filtered);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2>All Students</h2>
            <span className='badge bg-primary fs-6'>Total: {filteredStudents.length}</span>
        </div>

        {/* --- FILTER DROPDOWN --- */}
        <div className="card shadow-sm mb-4 p-3">
            <div className="row align-items-center">
                <div className="col-md-2 fw-bold text-muted">
                    Filter by Course:
                </div>
                <div className="col-md-6">
                    <select 
                        className="form-select" 
                        value={selectedCourse} 
                        onChange={handleFilterChange}
                    >
                        <option value="All">All Courses</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.title}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        {/* --- STUDENT TABLE --- */}
        <div className="card shadow-sm">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className='table table-hover table-striped mb-0 align-middle'>
                      <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Enrolled Course</th>
                            <th>Mobile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((s, index) => (
                          <tr key={index}>
                            <td>{s.id}</td>
                            <td className="fw-semibold">{s.name}</td>
                            <td>{s.email}</td>
                            <td>
                                {s.course_name ? (
                                    <span className="badge bg-success">{s.course_name}</span>
                                ) : (
                                    <span className="badge bg-secondary">Not Enrolled</span>
                                )}
                            </td>
                            <td>{s.mobile}</td>
                          </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan='5' className='text-center py-4 text-muted'>
                                    No students found.
                                </td>
                            </tr>
                        )}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;