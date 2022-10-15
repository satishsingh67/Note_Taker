package com.note.dataValidation;

public class DataValidation {

	public String loginValidation(String emailId, String password) {
		String result = null;
		try {

			result = (emailId == null ? "Email Id can't be blank"
					: emailId.trim().isEmpty() ? "Email Id can't be empty"
							: !emailId.trim().contains("@") ? "Enter a valid Email Id"
									: password == null ? "Password can't be blank"
											: password.trim().isEmpty() ? "Password can't be empty" : "true");

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	public String registerValidation(String firstName, String lastName, String email, String password) {
		String result = null;
		try {

			result = (firstName == null ? "First Name can't be blank"
					: firstName.trim().isEmpty() ? "First Name can't be empty"
							: lastName == null ? "Last Name can't be blank"
									: lastName.trim().isEmpty() ? "Last Name can't be empty"
											: email == null ? "Email can't be blank"
													: email.trim().isEmpty() ? "Email can't be empty"
															: !email.trim().contains("@") ? "Enter a valid Email Id"
																	: password == null ? "Password can't be blank"
																			: password.trim().isEmpty()
																					? "Password can't be empty"
																					: "true");

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	public String forgetPasswordValidation(String firstName, String lastName, String email) {
		String result = null;
		try {

			result = (firstName == null ? "First Name can't be blank"
					: firstName.trim().isEmpty() ? "First Name can't be empty"
							: lastName == null ? "Last Name can't be blank"
									: lastName.trim().isEmpty() ? "Last Name can't be empty"
											: email == null ? "Email can't be blank"
													: email.trim().isEmpty() ? "Email can't be empty"
															: !email.trim().contains("@") ? "Enter a valid Email Id"
																	: "true");

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

}
