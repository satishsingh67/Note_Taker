<%@page import="com.note.model.Login" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Todo App</title>
<link href = "https://cdnjs.cloudflare.com/ajax/libs/extjs/6.0.0/classic/theme-triton/resources/theme-triton-all.css" 
rel = "stylesheet" />
      
<script type="text/javascript" src="./js/ExtJs_Lib/ext-all-6.0.2.js"></script>
<script type="text/javascript" src="./js/ExtJs_Lib/ext-all-debug-6.0.2.js"></script>
<script type="text/javascript" src="./js/ExtJs_Lib/ext-all-debug.js"></script>
<script type="text/javascript" src="./js/ExtJs_Lib/ext-all.js"></script>
<script type="text/javascript" src="./js/ExtJs_Lib/ext-all.js"></script>
<%

Login login=(Login)session.getAttribute("login");
if(login==null){
	response.sendRedirect("login.jsp");
	return;
}else{ 
%>

<style>
    .loader {
      border: 3px solid #f3f3f3;
      border-radius: 50%;
      border-top: 3px solid #3498db;
      width: 60px;
      height: 60px;
      -webkit-animation: spin 1s linear infinite;
      animation: spin 1s linear infinite;
    }


    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
    }

    /* The Modal (background) */
    .modal {
      display: none;
      /* Hidden by default */
      position: fixed;
      /* Stay in place */
      z-index: 1;
      /* Sit on top */
      padding-top: 100px;
      /* Location of the box */
      left: 0;
      top: 0;
      width: 100%;
      /* Full width */
      height: 100%;
      /* Full height */
      overflow: auto;
      /* Enable scroll if needed */
      background-color: rgb(0, 0, 0);
      /* Fallback color */
      background-color: rgba(0, 0, 0, 0.4);
      /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
      background-color: #fefefe;
      margin: auto;
      margin-top: 8%;
      padding: 20px;
      border: 1px solid #888;
      width: 20%;
      height: 20%;
    }

   
  </style>
</head>
<body>
<input type="hidden"  id="userName" value="<%=login.getUserId()+","+login.getFirstName()+" "+login.getLastName()%>">
 
  <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <div class="loader1" >
        <div class="loader" style="margin: auto;margin-left:40%;margin-top:7%;">
        </div>

        <h5
          style="margin: auto;margin-left:22%;margin-top:0%;color: rgb(30, 169, 224);  letter-spacing: 5px; padding: 10px; font-size: 18px;">
          Please wait....</h5>
      </div>
    </div>

  </div>
  <script type="text/javascript" src="./js/ExtJs/Todo.js"></script>
 <%
}
 %>
</body>
</html>


 