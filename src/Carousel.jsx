import { Component } from "react";
// import useBreedList from "./useBreedList";
// HOOKS CANNOT BE USED IN CLAS COMPONENTS <==> CLASS COMPONENTS CANNOT HAVE USESTATES ETC ETC

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index, //this is called a uniray plus which converts string to a number
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal-thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

//if you wanna do use hooks in class component then have to use it like this below:

// function CarouselParent ({ animal }) {
//     const [breedList] = useBreedList(animal);

//     return <Carousel breedList={breedList} />
// }
// export default CarouselParent;
export default Carousel;
