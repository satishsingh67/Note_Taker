package com.note.action;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import com.note.dao.NoteDao;
import com.note.model.Todo;
import com.opensymphony.xwork2.Action;

public class NoteAction {
	private Integer id;
	private String notes;
	private Date fromDate;
	private Date toDate;
	private String query;
	private String message;
	private Map<String, Object> resultMap = new HashMap<String, Object>();
	private NoteDao noteDao = new NoteDao();

	public String fetchNotes() {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap = getNoteDao().fetch(fromDate, toDate, query, id);
			if (resultMap != null && resultMap.size() > 0) {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "success");
				this.resultMap.put("result", resultMap);

				return Action.SUCCESS;
			} else {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "failed");
				return "failed";
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			if (this.resultMap != null && this.resultMap.size() > 0) {
				this.resultMap.clear();
			}
			this.resultMap.put("status", "failed");
			return "failed";
		}
	}

	public String addNotes() {
		try {
			if (notes != null && notes.trim().length() > 0) {
				Todo todoObj = new Todo();
				todoObj.setUserId(id);
				todoObj.setNotes(notes);
				todoObj.setCreateDate(getCurrentDateInIST());
				todoObj.setUpdateDate(getCurrentDateInIST());
				todoObj.setSearchDate(getCurrentDateInIST());
				String status = getNoteDao().addNotes(todoObj);

				if (status.trim().equalsIgnoreCase("success")) {
					if (this.resultMap != null && this.resultMap.size() > 0) {
						this.resultMap.clear();
					}
					this.resultMap.put("status", "success");
					this.resultMap.put("message", "Data Added Successfully");
					return "success";
				} else {
					if (this.resultMap != null && this.resultMap.size() > 0) {
						this.resultMap.clear();
					}
					this.resultMap.put("status", "failed");
					this.resultMap.put("message", "Something went wrong.Please try again");
					return "failed";
				}
			} else {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "failed");
				this.resultMap.put("message", "Please Enter Notes to Add.");
				return "failed";
			}
		} catch (Exception e) {
			e.printStackTrace();
			if (this.resultMap != null && this.resultMap.size() > 0) {
				this.resultMap.clear();
			}
			this.resultMap.put("status", "failed");
			this.resultMap.put("message", "Something went wrong.Please try again");
			return "failed";
		}
	}

	public String editNotes() {
		try {
			if (notes != null && notes.trim().length() > 0) {
				Todo todoObj = new Todo();
				String status = getNoteDao().editNotes(id, notes);

				if (status.trim().equalsIgnoreCase("success")) {
					if (this.resultMap != null && this.resultMap.size() > 0) {
						this.resultMap.clear();
					}
					this.resultMap.put("status", "success");
					this.resultMap.put("message", "Data Updated Successfully");
					return "success";
				} else {
					if (this.resultMap != null && this.resultMap.size() > 0) {
						this.resultMap.clear();
					}
					this.resultMap.put("status", "failed");
					this.resultMap.put("message", "Something went wrong.Please try again");
					return "failed";
				}
			} else {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "failed");
				this.resultMap.put("message", "Please Enter Notes to Edit.");
				return "failed";
			}
		} catch (Exception e) {
			e.printStackTrace();
			if (this.resultMap != null && this.resultMap.size() > 0) {
				this.resultMap.clear();
			}
			this.resultMap.put("status", "failed");
			this.resultMap.put("message", "Something went wrong.Please try again");
			return "failed";
		}
	}

	public String deleteNotes() {
		try {
			String status = getNoteDao().deleteNotes(id);

			if (status.trim().equalsIgnoreCase("success")) {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "success");
				this.resultMap.put("message", "Data Deleted Successfully");
				return "success";
			} else {
				if (this.resultMap != null && this.resultMap.size() > 0) {
					this.resultMap.clear();
				}
				this.resultMap.put("status", "failed");
				this.resultMap.put("message", "Something went wrong.Please try again");
				return "failed";
			}
		} catch (Exception e) {
			e.printStackTrace();
			if (this.resultMap != null && this.resultMap.size() > 0) {
				this.resultMap.clear();
			}
			this.resultMap.put("status", "failed");
			this.resultMap.put("message", "Something went wrong.Please try again");
			return "failed";
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public NoteDao getNoteDao() {
		return noteDao;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
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

	public Date getCurrentDateInIST() throws ParseException {
		SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy  HH:mm:ss z");
		Date date = new Date();

		formatDate.setTimeZone(TimeZone.getTimeZone("IST"));
		// converting to IST or format the Date as IST

		System.out.println(formatDate.format(date));
		// print formatted date and time

		return  formatDate.parse(formatDate.format(new Date()));

	}
}
