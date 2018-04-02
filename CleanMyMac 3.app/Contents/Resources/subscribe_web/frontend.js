$(document).ready(function(){
	
	var content_length_paid = $('.paid_content .content_text').html().length;
	var content_length_trial = $('.trial_content .content_text').html().length;

	if( content_length_paid > 132 && content_length_paid < 180 ) {
		$('.paid_content .content_text').css('width', '488px');
	} else if( content_length_paid > 181 ) {
		$('.paid_content .content_text').css('width', '89%');
	}

	if( content_length_trial >= 148 && content_length_trial < 180 ) {
		$('.trial_content .content_text').css('width', '538px');
	} else if( content_length_trial > 181 ) {
		$('.trial_content .content_text').css('width', '85%');
	}

	if( content_length_trial >= 148 && content_length_trial < 180 ) {
		$('.paid_content_on_quit .content_text').css('width', '538px');
	} else if( content_length_trial > 181 ) {
		$('.paid_content_on_quit .content_text').css('width', '85%');
	}

	
	// $('.submit_btn').on('click', function(){
	// 	$('.email-subscribre').value.trim();
	// });
// var orig = $('.email-subscribre').val();

// $('.email-subscribre').keyup(function(){
// 	console.log(orig)
// });

});

var cmmSubscription;

document.addEventListener('DOMContentLoaded', function() {
	cmmSubscription = new CMMSubscription();
});

var CMMSubscription = function(){
	this.$$pagination = document.querySelectorAll('[data-to-page]');
	this.$nextButton = document.querySelector('[data-to-next]');
	this.$$slides = document.querySelectorAll('[data-slide]');
	this.currentIndex = 0;
	this.maxIndex = this.$$pagination.length - 1;
	this.transitionPropery = false;
	this.init();
    if (typeof(controller) !== 'undefined') {
        if( controller.textBlockCase() == 0 ) {
        	$('.paid_content').hide();
        	$('.paid_content_on_quit').hide();
            $('.trial_content').show();
            $('.setapp_content').hide();
        }
        else if( controller.textBlockCase() == 1 ) {
        	$('.paid_content_on_quit').hide();
            $('.trial_content').hide();
            $('.paid_content').show();
            $('.setapp_content').hide();
        }
        else if( controller.textBlockCase() == 3 ) {
            $('.paid_content_on_quit').hide();
            $('.trial_content').hide();
            $('.paid_content').hide();
            $('.setapp_content').show();
        }
        else {
            $('.trial_content').hide();
            $('.paid_content').hide();
            $('.paid_content_on_quit').show();
            $('.setapp_content').hide();
        }
    }
}

CMMSubscription.prototype.init = function() {
	var self = this;
	var email = new Email();
	var $emailSubscribe = document.querySelector('.email-subscribre');
	// var $skipSubscribe = document.querySelector('.skip-subscribe');
	var $subscribeForm = document.querySelector('.email-subscribre');

	// next button click
	self.$nextButton.addEventListener('click', function(e) {
		if (self.currentIndex < self.maxIndex) {
			self.goTo(self.currentIndex + 1);
		} else {
			$(".email-subscribre").val($.trim($(".email-subscribre").val()));
			email.validEmail();
			//__launch(); // external
		}
	}, false);
	$subscribeForm.addEventListener('submit', function(e){
		e.preventDefault();
		email.validEmail();
	})
	// get supported prefixes
	self.transitionPropery = self.getPrefix().transition;



	$emailSubscribe.addEventListener('keyup', function( e ){
		if ( e.keyCode == 13 ){
			$(".email-subscribre").val($.trim($(".email-subscribre").val()));
			email.validEmail();
		}
	})
}

CMMSubscription.prototype.getPrefix = function() {
	var el = document.createElement('div');
	var transformProps = 'transition WebkitTransition MozTransition msTransition'.split(' ');
    function support(properties) {
		for (var i = 0; i < properties.length; i++) {
			if (typeof el.style[properties[i]] !== 'undefined') {
				return properties[i];
			}
		}
	}

	return {
		transition: support(transformProps)
	}
}

var Email = function(opt) {
	this.email = '';
	this.init();
}

Email.prototype.init = function() {
	var self = this;
	this.$field = document.querySelector('.email-subscribre');
	this.$button = document.querySelector('.subscribe-button');
//	var newValidEmail = this.validEmail.bind( this );
	this.$field.addEventListener('click', function( e ) {
		self.setErrorClass('remove');
	});
	this.$field.addEventListener('keyup', function(){
		self.setErrorClass('remove');
	});
};

Email.prototype.validEmail = function() {
	var email = this.$field.value;
	var regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (regEmail.test( email )) {
		this.setErrorClass( 'remove');
		this.sendEmail( email );
	} else{
		this.setErrorClass( 'add');
	}
	this.$field.focus();
}

Email.prototype.sendEmail = function (email) {
	if (document.getElementById('email-progress')) document.getElementById('email-progress').classList.add('progress');
	__sendEmail(email);
}

function subscribeHandler (type) {
	var $field = document.querySelector('.email-subscribre');
	var $okMessage = document.querySelector('.thank-you-message.ok')
	var $falseMessage = document.querySelector('.thank-you-message.error');
	$field.parentNode.classList.add('successful-subscribe');

	if (document.getElementById('email-progress')) document.getElementById('email-progress').classList.remove('progress');

	if (type === 'ok') {
		$okMessage.style.display = "block";
	} else if ( type === 'error') {
		$falseMessage.style.display = "block";
	}
}

Email.prototype.setErrorClass = function(type) {
	if (type === 'add') {
		this.$field.classList.add('error-email');
	} else if (type === 'remove') {
		this.$field.classList.remove('error-email');
	}
}


function __sendEmail(email) {
	if (typeof(controller) !== 'undefined') controller.email_(email);
}
