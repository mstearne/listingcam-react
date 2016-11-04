var Slider = require('react-rangeslider');

var SpeedSlider = React.createClass({
    getInitialState: function(){
        return {
            value: 10,
        };
    },

    handleChange: function(value) {
        this.setState({
            value: value,
        });
    },

    render: function() {
        return (
            <Slider
        value={value}
        orientation="vertical"
        onChange={this.handleChange}
      />
        );
    }
});

module.exports = SpeedSlider;
