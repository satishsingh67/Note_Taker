package com.note.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.Parameter.Request;

import com.note.dao.NoteDao;
import com.note.dataValidation.DataValidation;

public class LoginAction {

	private Integer userId;
	private String emailId;
	private String password;
	private String message;
	private Map<String, Object> resultMap = new HashMap<String, Object>();
	private NoteDao noteDao = new NoteDao();

	public String login() {

		Map<String, Object> result = new HashMap<String, Object>();

		String dataValidationResult = new DataValidation().loginValidation(emailId, password);
		if (dataValidationResult != null && dataValidationResult.trim().equalsIgnoreCase("true")) {
			result = getNoteDao().loginCheck(emailId, password);

			if ((Boolean) result.get("status")) {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				HttpSession session = ServletActionContext.getRequest().getSession();
				this.resultMap.put("status", "success");
				this.resultMap.put("url", "index.jsp");
				session.putValue("login", result.get("login"));
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

	public String logOut() {
		String message = "LogOut Successfully.";
		try {
			if (this.resultMap != null && this.resultMap.size() > 0) {
				this.resultMap.clear();
			}
			HttpSession session = ServletActionContext.getRequest().getSession();
			session.removeAttribute("login");
			session.putValue("message", message);
			this.resultMap.put("status", "success");
			this.resultMap.put("url", "login.jsp");
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			this.resultMap.put("status", "failed");
			this.resultMap.put("message", "Something went wrong.Please try again");
			return "failed";

		}

	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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
