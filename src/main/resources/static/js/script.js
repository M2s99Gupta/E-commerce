$(function () {

	// User Register validation

	var $userRegister = $("#userRegister");

	$userRegister.validate({

		rules: {
			name: {
				required: true,
				lettersonly: true
			}
			,
			email: {
				required: true,
				space: true,
				email: true
			},
			mobileNumber: {
				required: true,
				space: true,
				numericOnly: true,
				minlength: 10,
				maxlength: 12

			},
			password: {
				required: true,
				space: true

			},
			confirmpassword: {
				required: true,
				space: true,
				equalTo: '#pass'

			},
			address: {
				required: true,
				all: true

			},

			city: {
				required: true,
				space: true

			},
			state: {
				required: true,


			},
			pincode: {
				required: true,
				space: true,
				numericOnly: true

			}, img: {
				required: true,
			}

		},
		messages: {
			name: {
				required: 'name required',
				lettersonly: 'invalid name'
			},
			email: {
				required: 'email name must be required',
				space: 'space not allowed',
				email: 'Invalid email'
			},
			mobileNumber: {
				required: 'mob no must be required',
				space: 'space not allowed',
				numericOnly: 'invalid mob no',
				minlength: 'min 10 digit',
				maxlength: 'max 12 digit'
			},

			password: {
				required: 'password must be required',
				space: 'space not allowed'

			},
			confirmpassword: {
				required: 'confirm password must be required',
				space: 'space not allowed',
				equalTo: 'password mismatch'

			},
			address: {
				required: 'address must be required',
				all: 'invalid'

			},

			city: {
				required: 'city must be required',
				space: 'space not allowed'

			},
			state: {
				required: 'state must be required',
				space: 'space not allowed'

			},
			pincode: {
				required: 'pincode must be required',
				space: 'space not allowed',
				numericOnly: 'invalid pincode'

			},
			img: {
				required: 'image required',
			}
		}
	})


	// Orders Validation

	var $orders = $("#orders");

	$orders.validate({
		rules: {
			firstName: {
				required: true,
				lettersonly: true
			},
			lastName: {
				required: true,
				lettersonly: true
			}
			,
			email: {
				required: true,
				space: true,
				email: true
			},
			mobileNo: {
				required: true,
				space: true,
				numericOnly: true,
				minlength: 10,
				maxlength: 12

			},
			address: {
				required: true,
				all: true

			},

			city: {
				required: true,
				space: true

			},
			state: {
				required: true,


			},
			pincode: {
				required: true,
				space: true,
				numericOnly: true

			},
			paymentType: {
				required: true
			}
		},
		messages: {
			firstName: {
				required: 'first required',
				lettersonly: 'invalid name'
			},
			lastName: {
				required: 'last name required',
				lettersonly: 'invalid name'
			},
			email: {
				required: 'email name must be required',
				space: 'space not allowed',
				email: 'Invalid email'
			},
			mobileNo: {
				required: 'mob no must be required',
				space: 'space not allowed',
				numericOnly: 'invalid mob no',
				minlength: 'min 10 digit',
				maxlength: 'max 12 digit'
			}
			,
			address: {
				required: 'address must be required',
				all: 'invalid'

			},

			city: {
				required: 'city must be required',
				space: 'space not allowed'

			},
			state: {
				required: 'state must be required',
				space: 'space not allowed'

			},
			pincode: {
				required: 'pincode must be required',
				space: 'space not allowed',
				numericOnly: 'invalid pincode'

			},
			paymentType: {
				required: 'select payment type'
			}
		}
	})

	// Reset Password Validation

	var $resetPassword = $("#resetPassword");

	$resetPassword.validate({

		rules: {
			password: {
				required: true,
				space: true

			},
			confirmPassword: {
				required: true,
				space: true,
				equalTo: '#pass'

			}
		},
		messages: {
			password: {
				required: 'password must be required',
				space: 'space not allowed'

			},
			confirmpassword: {
				required: 'confirm password must be required',
				space: 'space not allowed',
				equalTo: 'password mismatch'

			}
		}
	})







})



jQuery.validator.addMethod('lettersonly', function (value, element) {
	return /^[^-\s][a-zA-Z_\s-]+$/.test(value);
});

jQuery.validator.addMethod('space', function (value, element) {
	return /^[^-\s]+$/.test(value);
});

jQuery.validator.addMethod('all', function (value, element) {
	return /^[^-\s][a-zA-Z0-9_,.\s-]+$/.test(value);
});


jQuery.validator.addMethod('numericOnly', function (value, element) {
	return /^[0-9]+$/.test(value);
});








// first request: to server to create order

const paymentStart = () => {
	// event.preventDefault();
	console.log("Payments started");
	let amount = $("#payment_field").text().replace(/[^0-9.]/g, '');
	console.log(amount);
	if (amount == '' || amount == null) {
		// alert("amount is required !!");
		// swal("Failed!", "amount is required ", "success")
		return;
	}


	//to send request to server to create order using Jquery

	$.ajax(
		{
			url: '/user/create_order',
			// data:JSON.stringify({amount:amount,info:'order_request'}),
			data: JSON.stringify({
				amount: parseFloat(amount),
				info: 'order_request'
			}),
			contentType: 'application/json',
			type: 'POST',
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.status == "created") {
					// open payment form

					let options = {
						key: "rzp_test_u0i1GPEddm7STz",
						amount: response.amount,
						currency: "INR",
						name: "Vintage Computer Solution",
						Description: "Thank You !!",
						// image:""
						order_id: response.id,
						handler: function (response) {
							console.log(response.razorpay_payment_id);
							console.log(response.razorpay_order_id);
							console.log(response.razorpay_signature);
							console.log("payment successful");
							swal("Good job!", "Congratulations!! Payment successful!!", "success");
							// Add code here to confirm payment and proceed to success
							// Redirect only after successful confirmation
						},
						"prefill": {
							"name": "",
							"email": "",
							"contact": ""
						},
						"notes": {
							"address": "Vintage Computer Solution"
						},
						"theme": {
							"color": "#3399cc"
						}
					};

					// to payment initiate
					let rzp = new Razorpay(options);
					rzp.on('payment.failed', function (response) {
						console.log(response.error.code);
						console.log(response.error.description);
						console.log(response.error.source);
						console.log(response.error.step);
						console.log(response.error.reason);
						console.log(response.error.metadata.order_id);
						console.log(response.error.metadata.payment_id);
						//  alert("Oops, payment failed !!")
						swal("Failed !!", "Oops payment failed !!", "error")
					});

					rzp.open();


				}
			},
			error: function (error) {
				console.log(error)
				alert("Something went wrong !!")
			}
		}

	)


};






