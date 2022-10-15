package com.note.dao;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.web.client.RestClientException;

import com.note.model.Login;
import com.note.model.Todo;
import com.opensymphony.xwork2.Action;

public class NoteDao {

	public static Session getSession() {
		Session session = null;
		Configuration cfg = new Configuration();
		cfg.configure("hibernate.cfg.xml");
		SessionFactory factory = cfg.buildSessionFactory();
		session = factory.openSession();
		return session;

	}

	public String addNotes(Todo todoObj) {
		// TODO Auto-generated method stub

		Session session = getSession();

		try {
			Transaction tx = session.beginTransaction();

			session.save(todoObj);
			tx.commit();

			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		} finally {
			session.clear();
			session.close();
		}

	}

	public String editNotes(Integer id, String notes) {
		Session session = getSession();

		try {
			Transaction tx = session.beginTransaction();

			Todo todoObj = (Todo) session.get(Todo.class, id);

			todoObj.setNotes(notes);
			todoObj.setUpdateDate(new Date());

			session.update(todoObj);
			tx.commit();

			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		} finally {
			session.clear();
			session.close();
		}
	}

	public String deleteNotes(Integer id) {
		Session session = getSession();

		try {
			Transaction tx = session.beginTransaction();

			Query deleteQuery = session.createQuery("Delete from Todo where id=:id");
			deleteQuery.setParameter("id", id);

			int status = deleteQuery.executeUpdate();
			System.out.println(status);
			tx.commit();
			if (status > 0) {
				return "success";
			} else {
				return "failed";
			}

		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		} finally {
			session.clear();
			session.close();
		}
	}

	public Map<String, Object> fetch(Date fromDate, Date toDate, String query, Integer id) {
		Session session = getSession();
		Map<String, Object> result = new HashMap<String, Object>();

		try {
			StringBuffer fetchQueryString = new StringBuffer();
			fetchQueryString.append("From Todo");
			StringBuffer countQueryString = new StringBuffer();
			countQueryString.append("select count(*) ");

			if (query != null && query.trim().equalsIgnoreCase("fetch")) {

				Query countQuery = session.createQuery(
						countQueryString.append(fetchQueryString.toString()).append(" where userId=:id ").toString());
				countQuery.setParameter("id", id);
				Iterator count = countQuery.iterate();
				result.put("count", count.next());

				Query fetchQuery = session.createQuery(fetchQueryString.append(" where userId=:id order by createDate desc").toString());
				fetchQuery.setParameter("id", id);

				List<Todo> list = fetchQuery.list();

				if (list != null && list.size() > 0) {
					result.put("data", list);
				}

				return result;
			} else if (query != null && query.trim().equalsIgnoreCase("search")) {

				if (fromDate != null && toDate != null) {
					fetchQueryString.append(" where userId=:id ");
					fetchQueryString.append(" and searchDate between :fD ");
					fetchQueryString.append(" and  :tD  order by createDate asc");
				} else if (fromDate != null && toDate == null) {
					fetchQueryString.append(" where userId=:id and searchDate=:fD order by createDate asc");
				}

				countQueryString.append(fetchQueryString.toString());

				Query fetchQuery = session.createQuery(fetchQueryString.toString());
				Query countQuery = session.createQuery(countQueryString.toString());
				if (fromDate != null && toDate != null) {
					fetchQuery.setDate("fD", fromDate);
					countQuery.setDate("fD", fromDate);
					fetchQuery.setDate("tD", toDate);
					countQuery.setDate("tD", toDate);
					fetchQuery.setParameter("id", id);
					countQuery.setParameter("id", id);
				}
				if (fromDate != null && toDate == null) {
					System.out.println(fromDate);
					fetchQuery.setDate("fD", fromDate);
					countQuery.setDate("fD", fromDate);
					fetchQuery.setParameter("id", id);
					countQuery.setParameter("id", id);
				}

				Iterator count = countQuery.iterate();
				result.put("count", count.next());

				List<Todo> list = fetchQuery.list();

				if (list != null && list.size() > 0) {
					result.put("data", list);
				}

				return result;
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			session.clear();
			session.close();
		}

	}

	public Map<String, Object> loginCheck(String emailId, String password) {
		Session session = getSession();
		Map<String, Object> result = new HashMap<String, Object>();
		String message;
		try {
			Query query = session.createQuery("From Login where emailId=:email and password=:pswd ");
			query.setParameter("email", emailId);
			query.setParameter("pswd", password);
			query.setMaxResults(1);
			List<Login> login = (List<Login>) query.list();

			if (login != null && login.size() > 0) {

				Login loginObj = login.get(0);

				if (!emailId.trim().contentEquals(loginObj.getEmailId().trim())) {
					message = "wrong email id";
					result.put("status", false);
					result.put("message", message);
				} else if (!password.trim().contentEquals(loginObj.getPassword().trim())) {
					message = "wrong password";
					result.put("status", false);
					result.put("message", message);
				} else {
					message = "success";
					result.put("status", true);
					result.put("message", message);
					loginObj.setPassword(null);
					loginObj.setCreateDate(null);
					loginObj.setUpdateDate(null);
					result.put("login", loginObj);

				}

			} else {
				message = "No records found";
				result.put("status", false);
				result.put("message", message);
			}

			return result;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			session.clear();
			session.close();
		}

	}

	public Map<String, Object> register(String firstName, String lastName, String emailId, String password) {

		Map<String, Object> result = new HashMap<String, Object>();
		Session session = getSession();
		Transaction tx = session.beginTransaction();
		try {
			Login registerObj = new Login();

			registerObj.setFirstName(firstName);
			registerObj.setLastName(lastName);
			registerObj.setEmailId(emailId);
			registerObj.setPassword(password);
			registerObj.setCreateDate(new Date());
			registerObj.setUpdateDate(new Date());

			session.save(registerObj);
			tx.commit();

			result.put("status", true);
			result.put("message", "Account created successfully.");
			return result;

		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			result.put("status", false);
			result.put("message", "Something went wrong.Please try again.");
			return result;

		} finally {
			if (session != null) {
				session.clear();
				session.close();
			}
		}

	}

	public Map<String, Object> forgetPassword(String firstName, String lastName, String emailId) {

		Map<String, Object> result = new HashMap<String, Object>();
		Session session = getSession();
		try {
			Query query = session
					.createQuery("From Login where firstName=:firstName and lastName=:lastName and emailId=:emailId ");
			query.setString("firstName", firstName);
			query.setString("lastName", lastName);
			query.setString("emailId", emailId);
			query.setMaxResults(1);

			List<Login> resetObj = query.list();

			if (resetObj != null && resetObj.size() > 0) {

				result.put("status", true);
				result.put("message", "Congratsualtions Your account is recovered.Your Password is: "
						+ resetObj.get(0).getPassword());

			} else {
				result.put("status", false);
				result.put("message", "Soory no record found with given details");

			}

		} catch (Exception e) {
			e.printStackTrace();
			result.put("status", false);
			result.put("message", "Something went wrong please try again");

		}finally{
			if(session!=null) {
				session.clear();
				session.close();
			}
		}

		return result;
	}

	public static void main(String[] args) throws ParseException {

		System.out.println(new NoteDao().fetch(null, null, "fetch", 2));

	}

}
