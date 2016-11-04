// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
import moment from 'moment';
//var fs = require('fs');
import { DateRange } from 'react-date-range';
var Select = require('react-select');
//var DatePicker = require('./datepicker.js');
const CAMS = require('./data/cams');
const today = moment();
var SliderSpeed = require('nw-react-slider')
var SliderSize = require('nw-react-slider')


//import Slider from 'react-rangeslider'
//var SpeedSlider = require('./speedslider');


//import Slider from 'react-rangeslider';

/// this is the main URL that will be updated into different configs as
/// users change the options
var camURL = {
	start_url: 'http://listingcam.com/includes/animegif/gif.php?',
	cam_id:'&cam_id=',
	cam_idV:'philly4',
	perday_last:'&perday_hr=',
	perday_lastV:5,
	size:'&size=',
	sizeV:350,
	perday_hr:'&perday_hr=',
	perday_hrV:'',
	perday_start:'&perday_start=',
	perday_startV:'',
	perday_end:'&perday_end=',
	perday_endV:'',
	speed: '&speed=',
	speedV: '',
	city: '&city=',
	cityV: 'Philadelphia',
	logo: '&logo=',
	logoV: ''
};

var camSizeOptions = [
	{ value: 100, label: 100 },
	{ value: 200, label: 200 },
	{ value: 250, label: 250 },
	{ value: 300, label: 300 },
	{ value: 400, label: 400 },
	{ value: 500, label: 500 },
	{ value: 600, label: 600 },
	{ value: 700, label: 700 },
	{ value: 800, label: 800 }
];

//http://listingcam.com/includes/animegif/gif.php?cam_id=battleshipnj563&perday_start=2016-06-01&perday_end=2016-10-01&speed=30&city=Philadelphia&size=700&logo=accuweather-logo.png&perday_hr=20&a


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

	getInitialState: function() {
      return {
        liked: false,
		gifURL: this.genGifURL(),
		caption: 'ListingCam Giffer',
		startDate: moment().add(-4, 'days'),
		endDate: moment(),
		camID: CAMS.CAMS[Math.floor(Math.random()*CAMS.CAMS.length)].value,
		notes: 'notes',
		modified: false
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
		camURL.cam_idV=val.value;
		camURL.cityV=val.label.substring(0,15);
		this.setState({
			modified: true
		});

		// this.setState({
  // 		gifURL: this.genGifURL(),
		// caption: val.label
        // });
    },
	changeCamSize: function(val) {
		console.log(val);
		camURL.sizeV=val;

		this.setState({
  		imgSize: val
        });
		// this.setState({
  // 		gifURL: this.genGifURL(),
		// notes: val
        // });
    },
	handleChangeDate(range){
        console.log(range.endDate); // Momentjs object
		if(range.endDate>moment()){
			alert("Dates cannot be in the future");
//			alert("up2")
		}else{
			// alert(JSON.stringify(range, null, 4))
			// alert(moment(range.startDate).format('YYYY-MM-DD').toString())
			camURL.perday_startV = moment(range.startDate).format('YYYY-MM-DD').toString();
			camURL.perday_endV = moment(range.endDate).format('YYYY-MM-DD').toString();

			// this.setState({
			// 	startDate: camURL.perday_startV,
			// 	endDate: camURL.perday_endV,
			// 	gifURL: this.genGifURL(),
			// 	notes: this.genGifURL()
			// });
		}
    },
	handleImageLoaded() {
		console.log("Image Loaded");
//      this.setState({ notes: 'loaded' });
  	},
	handleSpeedChange(slider) {
		console.log(slider);
		camURL.speedV = slider;

		this.setState({
			imgSpeed: slider
		});
  	},
	genGifURL(){
		var arr = Object.keys(camURL).reduce(function(res, v) {
		    return res.concat(camURL[v]);
		}, []);
		return arr.join("");
	},
	updateImage(){
		this.setState({
  		gifURL: this.genGifURL(),
		notes: this.genGifURL()
        });
	},
  	render: function() {
	  var buttonClass = this.state.liked ? 'active' : '';
	  var updateButtonClass = this.state.modified ? 'active' : 'inactive';

    return (

		<div className='main-container'>
			<div className="container">
				<div className="jumbotron">
					<h2>{this.state.caption}</h2>
					{/*<Image src={gifURL} width={500} height={300} mode='fit' /> */}

					<div className="container-fluid bgWhite">
						<div className="row">
							<div className="col-md-12">
								<div id="gifContainer" className="text-center">
									<img id="theGif" src={this.state.gifURL} onLoad={this.handleImageLoaded} />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<DateRange
				                    onChange={this.handleChangeDate}
									calendars="1"
				                />
							</div>
							<div className="col-md-6">
								<div>
									<label>Camera</label> <Select
										name="camSelect"
										value=""
										options={CAMS.CAMS}
										onChange={this.changeCam} />
								</div>
								<div>

									<div className="container-fluid">
										<div className="row">
											<div className="col-md-1">
												<label>Width</label>
											</div>
											<div className="col-md-10">
												<SliderSize
												  value={350}
												  min={150}
												  max={1000}
												  markers={[{value: 3, label: 'Three'}, {value: 8, label: 'Eight'}]}
												  onChange={this.changeCamSize} className="sliders" />
											</div>
											<div className="col-md-1">
												{this.state.imgSize}
											</div>
										</div>
									</div>

			  					</div>
								<br />
									<br />
										<br />
								<div>
									<div className="container-fluid">
										<div className="row">
											<div className="col-md-1">
												<label>Speed</label>
											</div>
											<div className="col-md-10">
												<SliderSpeed
												  value={40}
												  min={0}
												  max={200}
												  markers={[{value: 3, label: 'Three'}, {value: 8, label: 'Eight'}]}
												  onChange={this.handleSpeedChange} className="sliders" />
											</div>
											<div className="col-md-1">
												{this.state.imgSpeed}
											</div>
										</div>
									</div>

			  					</div>
								<br />
									<br />
										<br />
										<button onClick={this.updateImage} className="{updateButtonClass}">Update Image</button>
							</div>
						</div>
					</div>


						<div className='bar'>
				          <span>
							<br />Start Date: {(this.state.startDate).toString()}
							<br />End Date: {(this.state.endDate).toString()}
							<br />{this.state.notes}
							</span>
				        </div>
				</div>
			</div>
		</div>
    );
  }
});


ReactDOM.render(<GifGen src='{this.genGifURL()}' caption='Hong Kong!' />, document.getElementById('app'));
