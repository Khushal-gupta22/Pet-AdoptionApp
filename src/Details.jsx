import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🤔</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div
      /* onClick={() => alert("hi")}  we caught the events bubbling of the virtual dom here by putting an event listener i.e onClick here */ className="details"
    >
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            {" "}
            {/* this is going inside the react virtual dom and the react virtual dom is different from the normal dom , we can actually catch it's events bubbling above in the normal dom  */}
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
