package com.note.action;

import java.util.HashMap;
import java.util.Map;

import com.note.dao.NoteDao;
import com.note.dataValidation.DataValidation;

public class ForgetPasswordAction {

	private String firstName;
	private String lastName;
	private String emailId;
	private String message;
	private Map<String, Object> resultMap = new HashMap<String, Object>();
	private NoteDao noteDao = new NoteDao();

	
	public String forgetPassword() {

		Map<String, Object> result = new HashMap<String, Object>();

		String dataValidationResult = new DataValidation().forgetPasswordValidation(firstName, lastName, emailId);
		if (dataValidationResult != null && dataValidationResult.trim().equalsIgnoreCase("true")) {
			result = getNoteDao().forgetPassword(firstName, lastName, emailId);

			if ((Boolean) result.get("status")) {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "success");
				this.resultMap.put("message", result.get("message"));
				return "success";
			} else {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "failed");
				this.resultMap.put("message", result.get("message"));
				return "failed";
			}
		} else {
			if (this.resultMap != null && this.resultMap.size() > 0) {
				this.resultMap.clear();
			}
			this.resultMap.put("status", "failed");
			this.resultMap.put("message", dataValidationResult.trim());
			return "failed";
		}

	}
	
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Map<String, Object> getResultMap() {
		return resultMap;
	}

	public void setResultMap(Map<String, Object> resultMap) {
		this.resultMap = resultMap;
	}

	public NoteDao getNoteDao() {
		return noteDao;
	}

	public void setNoteDao(NoteDao noteDao) {
		this.noteDao = noteDao;
	}

}
