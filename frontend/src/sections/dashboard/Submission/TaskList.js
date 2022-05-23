import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyTaskList from "../../../_mocks_/MyTaskList";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";
import { MdDateRange } from "react-icons/md";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import SubmissionModalTask from "../../../components/Modal/SubmissionModalTask";


const ICONCOLOR = "#B2B2B2";
const TaskList = () => {
  const [taskListData, setTaskListData] = useState([]);
  const [isLoaded , setIsLoaded] = useState(false);

  const { isLoading, isError, data, error, refetch } = useQuery(
    "taskList",
    async () => {
      await MyTaskList().then((res) => {
        setTaskListData(res[0].data);
      });
      setIsLoaded(true);
    }
  );

  if (isLoading || !isLoaded) {
    return <Loading />; 
  }
  if (isError) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
      <Row>
        {taskListData.map((data) => (
          <Col lg={4} key={data.id}>
            <div className="project_card position-relative mt-3 mb-5">
              <Card border={"0"}>
                <Card.Body>
                  <Card.Text as={"div"}>
                    <div className={"d-flex mt-2 justify-content-between"}>
                    <p className="fw-bold">{data.title}</p>
                    <SubmissionModalTask task_id={data.id} project_id={data.project[0].id} refetch={refetch}/>
                    </div>
                    <div className="mb-3">
                      <Form.Text>
                        <Accordion>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>جزئیات تسک</Accordion.Header>
                            <Accordion.Body>
                              {data.description}
                              <br/>
                              <div className={"d-flex mt-2 justify-content-between"}>
                                <div className="d-inline-flex"><MdDateRange size={20} color={ICONCOLOR} />
                                  <span className="small mx-2 text-muted">
                                    {
                                      new Date(data.created_at).toLocaleString("fa-ir",
                                        {
                                          year: "numeric",
                                          month: "numeric",
                                          day: "numeric",
                                          hour: '2-digit',
                                          minute:'2-digit'
                                        })
                                    }
                                  </span>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Form.Text>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
  );
};

export default TaskList;