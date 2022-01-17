package servlets;

import beans.Result;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Stack;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        HttpSession session = req.getSession();
        Stack<Result> list = (Stack<Result>) session.getServletContext().getAttribute("points");

        if (list == null) {
            session.getServletContext().setAttribute("points", new Stack<Result>());
        }

        switch (req.getParameter("type")) {
            case "check":
                if (!validate(req.getParameter("x"), req.getParameter("y"), req.getParameter("r"))) break;
                req.getRequestDispatcher("/check").forward(req, resp);
                break;
            case "clear":
                req.getRequestDispatcher("/clear").forward(req, resp);
                break;
            default:
                req.getRequestDispatcher("/error").forward(req, resp);
        }
    }

    public boolean validate(String x, String y, String r) {
        if (x == null || y == null || r == null)
            return false;
        try {
            double xd = Double.parseDouble(x);
            double yd = Double.parseDouble(y);
            double rd = Double.parseDouble(r);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
