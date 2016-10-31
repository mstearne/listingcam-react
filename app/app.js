// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var DatePicker = require('react-daterange-picker');
var moment = require('moment');
import Select from 'react-select';

import 'react-widgets/lib/less/react-widgets.less';
import DropdownList from 'react-widgets/lib/DropdownList';


function logChange(val) {
	console.log("Selected: " + val);
}

// Here we create a set of Javascript variables
var name = "Ahmed";
var num1 = 1;
var num2 = 2;

var cams = ['philly1','philly4','philly3','seaisle556','seaisle555','seaisle557'];


var GifGen = React.createClass({

	toggleLiked: function() {
      this.setState({
        liked: !this.state.liked,
		gifURL: 'http://listingcam.com/includes/animegif/gif.php?cam_id='+cams[Math.floor(Math.random()*cams.length)]+'&perday_last=5&size=400',
		caption: cams[Math.floor(Math.random()*cams.length)]

      });
    },
	getInitialState: function() {
      return {
        liked: false,
		gifURL: 'http://listingcam.com/includes/animegif/gif.php?cam_id=philly4&perday_last=5&size=400',
		caption: 'hello again',
		startDate: moment().add(-4, 'days'),
		endDate: moment(),
		camID: 'philly4'
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


	  var options = [
	      { value: 'one', label: 'One' },
	      { value: 'two', label: 'Two' }
	  ];


    return (

		<div className='main-container'>

			<div className="container">

				<div className="jumbotron">
					<div id="gifContainer"><img id="theGif" src={this.state.gifURL} /></div>
					{/*<Image src={gifURL} width={500} height={300} mode='fit' /> */}

<DropdownList/>

				{/*
					<Select
					    name="form-field-name"
					    value="one"
					    options={options}
					    onChange={logChange}
					/>
					*/}
					{/*Inserted the variables and simple calculations using curly brackets */}
					<hr />
						<DatePicker selected={this.state.startDate} onChange={this.handleChangeStartDate} />
						<DatePicker selected={this.state.endDate} onChange={this.handleChangeEndDate} />


						<select id="camSelect" select="this.state.camID"></select>
						<div className='bar'>
				          <button onClick={this.toggleLiked} className={buttonClass}>♥</button>
				          <span>{this.state.caption}
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
