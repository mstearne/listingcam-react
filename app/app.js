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


var camURL = {
	start_url: 'http://listingcam.com/includes/animegif/gif.php?',
	cam_id:'&cam_id=',
	cam_idV:'',
	perday_last:'&perday_hr=',
	perday_lastV:'',
	size:'&size=',
	sizeV:'',
	date:'&date=',
	dateV:'',
	perday_hr:'&perday_hr=',
	perday_hrV:'',
	perday_start:'&perday_start=',
	perday_startV:'',
	perday_end:'&perday_end=',
	perday_endV:'',
	speed: '&speed=',
	speedV: '',
	city: '&city=',
	cityV: '',
	logo: '&logo=',
	logoV: 'listingcam-icon.png'
};

function logChange(val) {
	console.log("Selected: " + val);
}

var GifGen = React.createClass({

	getInitialState: function() {
      return {
        liked: false,
		caption: 'ListingCam Giffer',
		startDate: moment().add(-4, 'days'),
		endDate: moment(),
		settingsModified: false,
		imgWidth: 150,
		imgMin: 150,
		imgMax: 1000,
		imgSpeed: 10,
		imgSpeedMin: 1,
		imgSpeedMax: 100,
		loadingMessageClass: 'show',
		gifContainerClass: 'hidden',
      };
    },
	componentWillMount: function(){
		// Set initial random cam
		this._mounted = false;

		/// pull a random camera from the list of cameras available
		var firstCam = CAMS.CAMS[Math.floor(Math.random()*CAMS.CAMS.length)];

		camURL.cam_idV = firstCam.value;
		camURL.camID = firstCam.value;
		this.state.camID = firstCam.value;
		camURL.cityV = firstCam.label;
		camURL.sizeV = this.state.imgWidth;
		camURL.speedV = this.state.imgSpeed;
		camURL.logoV = 'listingcam-icon.png';

		this.genGifURL();
    	return { /* something here */};
	},
	componentDidMount: function(){

		this._isMounted = true;

		this.setState({
		  gifURL: this.genGifURL()
		});



		return { /* something here */};
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
		if(this.state.imgWidth<200){
			camURL.cityV=val.label.substring(0,15);
		}else{
			camURL.cityV=val.label.substring(0,15);
		}
		this.setState({
			settingsModified: true,
			camID: val.value,
		});
    },
	changeImgWidth: function(val) {
		console.log(document.getElementById("theGif").height);
		camURL.sizeV=val;

		// document.getElementById("theGif").style.width = val+"px";
		// document.getElementById("loadingContainer").style.height = document.getElementById("theGif").style.height+'px';

		this.setState({
			imgWidth: val,
			imgHeight: document.getElementById("theGif").height,
			settingsModified: true
        });
    },
	handleChangeDate(range){
        console.log(range.endDate); // Momentjs object
		if(range.endDate>moment()){
			alert("Dates cannot be in the future");
		}else{
			camURL.perday_startV = moment(range.startDate).format('YYYY-MM-DD').toString();
			camURL.perday_endV = moment(range.endDate).format('YYYY-MM-DD').toString();

			 this.setState({
				 settingsModified: true
			 });
		}
    },
	handleImageLoaded() {
		console.log("Image Loaded");

		this.setState({
			notes: 'loaded',
			loadingMessageClass: false,
			gifContainerClass: 'show',
			settingsModified: false
		});
  	},
	changeImgSpeed(slider) {
		console.log(slider);
		camURL.speedV = slider;

		this.setState({
			imgSpeed: slider,
			settingsModified: true
		});
  	},
	genGifURL(){
		var arr = Object.keys(camURL).reduce(function(res, v) {
		    return res.concat(camURL[v]);
		}, []);
		var url=arr.join("");

		if (this._mounted){
			this.setState({
				notes: url
			});
			console.log(url);
		}else{
			console.log(url);
		}

		return url;
	},
	updateImage(){
		this.setState({
	  		gifURL: this.genGifURL(),
			loadingMessageClass: 'show',
			gifContainerClass: 'hidden',
			settingsModified: false
        });

	},
  	render: function() {
	  var buttonClass = this.state.liked ? 'active' : '';
	  var loadingMessageClass = this.state.loadingMessageClass ? 'show' : 'hidden';
	  var updateImageButtonClass = this.state.settingsModified ? 'show' : 'hidden';
	  var updatingImageButtonClass = this.state.loadingMessageClass ? 'show' : 'hidden';

    return (

		<div className='main-container'>
			<div className="container">
				<div className="jumbotron">
					<h2>{this.state.caption}</h2>
					<div className="container-fluid bgWhite">
						<div className="row">
							<div className="col-md-12 text-center">
								<div>
									<Select
										name="camSelect"
										value={this.state.camID}
										options={CAMS.CAMS}
										onChange={this.changeCam} />
									<br />
								</div>

								<div id="loadingMessage" className={loadingMessageClass}>
									<div className="text-center" id=""><img src="/images/poi.gif" id="loadingContainer" height={this.state.imgHeight} /></div>
								</div>
								<div className={this.state.gifContainerClass}>
								<div id="gifContainer" className="text-center">
									<img id="theGif" src={this.state.gifURL} onLoad={this.handleImageLoaded} width={this.state.imgWidth} />
								</div>
								</div>
								<br />



							</div>
						</div>
						<div className="row">
							<div className="col-md-7">
								<DateRange
				                    onChange={this.handleChangeDate}
									calendars="2"
				                />
							</div>
							<div className="col-md-5">
								<div>

									<div className="container-fluid">
										<div className="row">
											<div className="col-md-1">
												<label>Width</label>
											</div>
											<div className="col-md-10">
												<SliderSize
												  value={this.state.imgWidth}
												  min={this.state.imgMin}
												  max={this.state.imgMax}
												  step={20}
												  onChange={this.changeImgWidth} className="sliders" />
											</div>
											<div className="col-md-1">
												{this.state.imgWidth}
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
												  value={this.state.imgSpeed}
												  min={this.state.imgSpeedMin}
												  max={this.state.imgSpeedMax}
												  onChange={this.changeImgSpeed} className="sliders" />
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
											<div className={updateImageButtonClass}>
											<button onClick={this.updateImage} className="btn btn-primary btn-block">Update Image</button>
											</div>
											<div className={updatingImageButtonClass}>
											<button className="btn btn-primary btn-block" disabled>Updating Image...</button>
											</div>
							</div>
						</div>
					</div>


						<div className='bar'>
				          <span>
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
