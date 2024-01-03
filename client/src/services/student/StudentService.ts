import axios from "axios";
class StudentService {
  buscar = async () => {
    return await axios
      .get("http://localhost:8000/api/student")
      .then((result) => result.data)
      .catch((err) => console.log(err));
  };
}

const studentService: StudentService = new StudentService();

export default studentService;
