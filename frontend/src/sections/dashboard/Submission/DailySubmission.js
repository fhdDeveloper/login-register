import { Button, Col, Form, Row } from "react-bootstrap";
import UserSubmission from "../../../_mocks_/UserSubmission";
import { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { destroyUserSubmissionTask, updateUserSubmissionTask } from "../../../api/_api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { SubmissionDataContext } from "../../../context/SubmissionDataContext";

const token = localStorage.getItem("token");

const SubmissionRow = ({ data }) => {
  const [duration, setDuration] = useState(data.duration);
  const [description, setDescription] = useState(data.description);
  const { SubmissionItems, setSubmissionItems } = useContext(SubmissionDataContext);

  const EditHandler = (sub_id, task_id, project_id) => {
    let formData = new FormData();
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("task_id", task_id);
    formData.append("project_id", project_id);

    updateUserSubmissionTask(token, sub_id, formData)
      .then(res => {
        if (res.data.status === "success") {
          toast.success("ویرایش گزارش با موفقیت ثبت شد!");
          UserSubmission().then(res => {
            setSubmissionItems(res[0].data);
          });
        } else {
          toast.error("خطا!");
        }
      })
      .catch((err) => console.log(err));
  };
  const Token = localStorage.getItem("token");

  const removeHandler = (task_id) => {
    destroyUserSubmissionTask(Token, task_id).then(() => {
        toast.success("حذف گزارش با موفقیت ثبت شد!");
        UserSubmission().then(res => {
          setSubmissionItems(res[0].data);
        });
      }
    );
  };

  return (
    <Row className="mb-3">
      <Col sm={12}>
        <Form className="d-md-flex mb-2" key={data.id}>
          <Form.Group controlId="formBasicProject" className={"mx-1"}>
            <Form.Label>نام پروژه</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              defaultValue={data.projects.name}
            />
          </Form.Group>
          <Form.Group controlId="formBasicTask" className={"mx-1"}>
            <Form.Label>نام تسک</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              defaultValue={data.tasks.title}

            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription" className={"mx-1"}>
            <Form.Label>توضیحات</Form.Label>
            <textarea
              className="form-control"
              rows="1"
              cols="50"
              defaultValue={description}
              onChange={event => setDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicTime" className={"mx-1"}>
            <Form.Label>مدت</Form.Label>
            <Form.Control
              type="number"
              defaultValue={duration}
              onChange={event => setDuration(event.target.value)}
              max="12:00" min="00:01"
            />
          </Form.Group>
          <Form.Group controlId="formBasicTime" className={"mt-4"}>
            <BsPencilSquare onClick={() => EditHandler(data.id, data.task_id, data.projects.id)}
                            className={"btn-icon-add mx-3 mt-3"} size={28} role="button" title="ویرایش" />
          </Form.Group>
          <Form.Group controlId="formBasicTime" className={"mt-4"}>
            <RiDeleteBin5Line onClick={() => removeHandler(data.id)} className={"btn-icon-add mt-3 "} size={28}
                              role="button" title="حذف" />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

const DailySubmission = () => {
  const [loaded, setLoaded] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const { SubmissionItems, setSubmissionItems } = useContext(SubmissionDataContext);

  return (
    SubmissionItems.map(task =>
      <SubmissionRow data={task} />
    )
  );
};

export default DailySubmission;