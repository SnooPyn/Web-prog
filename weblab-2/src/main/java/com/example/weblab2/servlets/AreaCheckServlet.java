package com.example.weblab2.servlets;

import com.example.weblab2.beans.EntriesBean;
import com.example.weblab2.beans.Entry;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        long startTime = System.nanoTime();

        String xString = request.getParameter("xvalue");
        String yString = request.getParameter("yvalue").replace(',', '.');
        String rString = request.getParameter("rvalue");
        boolean isValuesValid = validateValues(xString, yString, rString);

        if (isValuesValid) {
            double xValue = Double.parseDouble(xString);
            double yValue = Double.parseDouble(yString);
            double rValue = Double.parseDouble(rString);
            boolean isHit = checkHit(xValue, yValue, rValue);

            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;
            try {
                currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(request.getParameter("timezone")));
                currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (Exception exception) {
                currentTime = "HH:mm:ss";
            }

            String executionTime = String.valueOf(System.nanoTime() - startTime);

            EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
            if (entries == null) entries = new EntriesBean();
            entries.getEntries().add(new Entry(xValue, yValue, rValue, currentTime, executionTime, isHit));
            request.getSession().setAttribute("entries", entries);
        }

        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }

    private boolean checkX(String xString) {
        try {
            Double xRange[] = {-5.0, -4.0, -3.0, -2.0, -1.0, 0d, 1.0, 2.0, 3.0};
            double xValue = Double.parseDouble(xString);
            return Arrays.asList(xRange).contains(xValue);
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    private boolean checkY(String yString) {
        try {
            double yValue = Double.parseDouble(yString);
            return yValue >= -3 && yValue <= 5;
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    private boolean checkR(String rString) {
        try {
            Double rRange[] = {1.0, 2.0, 3.0, 4.0, 5.0};
            double rValue = Double.parseDouble(rString);
            return Arrays.asList(rRange).contains(rValue);
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    private boolean validateValues(String xString, String yString, String rString) {
        return checkX(xString) && checkY(yString) && checkR(rString);
    }

    private boolean checkTriangle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && yValue <= 0 && yValue >= (-xValue - rValue);
    }

    private boolean checkRectangle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue >= 0 && xValue <= rValue/2 && yValue <= rValue;
    }

    private boolean checkCircle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue <= 0 && Math.sqrt(xValue*xValue + yValue*yValue) <= rValue;
    }

    private boolean checkHit(double xValue, double yValue, double rValue) {
        return checkTriangle(xValue, yValue, rValue) || checkRectangle(xValue, yValue, rValue) ||
                checkCircle(xValue, yValue, rValue);
    }
}