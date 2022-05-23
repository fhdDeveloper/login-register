import { Button, Card } from "react-bootstrap";
import { MdOutlineSubtitles } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Helmet } from 'react-helmet-async';


const ContentSection = ({ children, title, ButtonLink, ButtonTitle }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>    <Card className="ContentCard" border="0">
      <Card.Title className="border-1 border-bottom p-3 d-flex justify-content-between align-items-center">
        <span>
          <MdOutlineSubtitles className="me-1" color="#B2B2B2" />
          {title}
        </span>
        {
          (ButtonLink && ButtonTitle) && (
            <Button to={ButtonLink} as={Link} variant="outline-primary">
              <AiOutlinePlusCircle size="20px" className="me-1" />
              {ButtonTitle}
            </Button>
          )
        }

      </Card.Title>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
    </>
  );
};

export default ContentSection;