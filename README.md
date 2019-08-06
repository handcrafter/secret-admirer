# Welcome to Secret Admirer

Secret admirer allows you to find the best picture of celebrities. Become the number one fan of your favourite star today!

## Technologies
-	mongo DB
-	nodejs
-	express
-	React
-	Javascript
-	HTML
-	CSS

## Versions
- node `v10.15.3`
- MongoDB `version v4.0.3`
- express `^4.16.4`
- react `^16.8.6`
- web pack `^4.32.2`

## Instruction
-   first install necessary packages -  `npm install`
-   Start up database -  `mongod --dbpath data`
-   start up server -  `npm run dev`
-   verify your setup by running -  `npm run test`
-   the server is running on  `localhost:5000`
-   Start up client server in client directory -  `npm run client`
-   Client server is running on `localhost:8080`
-   Package and build client files for distribution -  `npm run create`

## Structure of Code base
###	Client
-	**component** - react page component for displaying searched/saved Images, as well as, login configurations
-	**CSS** - style sheet for react components
-	**Index.jsx** - homepage
###	Server
- **DB** - stores schemas for user, celebrity, favourites and establishes a connection to the database
- **routes** - handles fetch communication with client and database

## Dependencies Highlight
**bcryptjs** generates hashed encryption for user password
**crawler** text extraction from a website
**puppeteer** Image retrieval from a website
**reactstrap** bootstrap style for react components

## Code Description
**index.jsx** 
- First page that user will encounter. 
- user can search their favourite celebrity using search bar
- searched value is passed to displaying page upon button click handled by search function
```
Search(event) {
// Render only if user types something in the input field
	if (this.state.value) {
		var  search  =  this.state.value;
		ReactDOM.render(<Nav  celebrity={search}/>, document.getElementById("app"));
		event.preventDefault();
	}
}
```
**searchImage.jsx** 
- Displays images in gallery view using `react-photo-gallery`
- Searched value is sent to image extractor using fetch call then image-extractor returns array of image urls on success
- Fill the gallery images using extracted urls
- Page will stay in loading status until extraction is complete
- Modal Carousel view will pop up when an image inside the gallery is selected
- User can add selected image to favourite list in Modal view
```
{isLoaded ?
	<Gallery  photos={this.state.images}  direction={"column"}  onClick={this.viewSelectedImage}  /> :
	<Spinner  color="primary"  style={{ width:  '3rem', height:  '3rem' }}  type="grow"  />
}
<ModalGateway>
	{modalIsOpen ? (
		<Modal  onClose={this.closeSelectedImage}>
			<Carousel  currentIndex={this.state.selectedIndex}  views={this.state.images}  components={{ Header:  ModalHeader }}/>
		</Modal>
	) : null}
</ModalGateway>
```

**savedImage.jsx** 
- Retrieve image urls saved in favourite list from database and display it on the gallery
- Favourite list is searched based on user ID

**NavLinks.jsx** 
- Defines contents to be displayed in navigation bar including login and search bar
- Provides SignIn/Signup and search functionalities
- Pass user info to Nav.jsx when sign in is successful
- Pass celebrity searched to Nav.jsx for re-rendering gallery images
```
navSearch() {
	// Send user searched celebrity value if such value is not empty
	if (this.state.celebrity) {
		var  data  = {username:  this.state.username, celebrity:  this.state.celebrity};
		this.props.parentCallback(data);
	}
}
```

