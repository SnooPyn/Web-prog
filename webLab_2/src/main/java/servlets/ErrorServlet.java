package servlets;

import beans.Result;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Stack;

public class ErrorServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        long start = System.nanoTime();
        GregorianCalendar date = new GregorianCalendar();

        HttpSession session = req.getSession();
        Stack<Result> list = (Stack<Result>) session.getServletContext().getAttribute("points");

        long finish = System.nanoTime();
        list.push(new Result("Error","-", "-", "-", String.valueOf(finish-start) + " ns", date.get(Calendar.HOUR) + ":" + date.get(Calendar.MINUTE) + ":" + date.get(Calendar.SECOND)));

        req.getRequestDispatcher("project/assets/jsp/Table.jsp").forward(req, res);
    }
}
