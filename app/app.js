// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var DateRangePicker = require('react-daterange-picker');
var moment = require('moment');
import {} from 'moment-range';
import timekeeper from 'timekeeper';
var Select = require('react-select');
//var DatePicker = require('./datepicker.js');
const CAMS = require('./data/cams');

// console.log(CAMS.CAMS);
// console.log(CAMS.CAMS[Math.floor(Math.random()*CAMS.CAMS.length)].value);

function logChange(val) {
	console.log("Selected: " + val);
}

// Here we create a set of Javascript variables
// var name = "Ahmed";
// var num1 = 1;
// var num2 = 2;


var GifGen = React.createClass({

	toggleLiked: function() {
      this.setState({
        liked: !this.state.liked,
		gifURL: 'http://listingcam.com/includes/animegif/gif.php?cam_id=philly4&perday_last=5&size=400',
		caption: 'hllo'

      });
    },
	getInitialState: function() {
      return {
        liked: false,
		gifURL: 'http://listingcam.com/includes/animegif/gif.php?cam_id='+CAMS.CAMS[Math.floor(Math.random()*CAMS.CAMS.length)].value+'&perday_last=5&size=400',
		caption: 'Welcome to ListingCam Giffer',
		startDate: moment().add(-4, 'days'),
		endDate: moment(),
		camID: CAMS.CAMS[Math.floor(Math.random()*CAMS.CAMS.length)].value
      };
    },
	handleChangeStartDate: function(date) {
		if(date>this.state.endDate){
			alert("start date must be before end date");
		}else{
			this.setState({
	  		  startDate: date
	        });
		}
    },
	changeCam: function(val) {
		console.log(val);
		this.setState({
  		gifURL: 'http://listingcam.com/includes/animegif/gif.php?cam_id='+val.value+'&perday_last=5&size=400',
		caption: val.value
        });
    },
	handleChangeEndDate: function(date) {
		if(date>moment()){
			alert("End date cannot be in the future")
		}else{
			if(date<this.state.startDate){
				alert("End date must be after start date")
			}else{
				this.setState({
		  		  endDate: date
		        });
			}
		}
    },
  render: function() {
	  var buttonClass = this.state.liked ? 'active' : '';


    return (

		<div className='main-container'>

			<div className="container">

				<div className="jumbotron">
					<h1>{this.state.caption}</h1>
					<div id="gifContainer" className="text-center"><img id="theGif" src={this.state.gifURL} width="400" height="225" /></div>
					{/*<Image src={gifURL} width={500} height={300} mode='fit' /> */}

					<div>
					<Select
					    name="camSelect"
					    value=""
					    options={CAMS.CAMS}
					    onChange={this.changeCam}
					/>
					</div>
					<div>
					<DateRangePicker
			          numberOfCalendars={2}
			          selectionType="range"
			          minimumDate={new Date()} />
			      </div>

						<div className='bar'>
				          <span>
							<br />Start Date: {(this.state.startDate).toString()}
							<br />End Date: {(this.state.endDate).toString()}
							</span>
				        </div>

				</div>

			</div>


		</div>
    );
  }
});


ReactDOM.render(<GifGen src='http://listingcam.com/includes/animegif/gif.php?cam_id=philly4&perday_last=5&size=200' caption='Hong Kong!' />, document.getElementById('app'));
