package Lab_3.Web_lab_3;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "entry")
@Entity
public class Entry implements Serializable {

    @Id
    @SequenceGenerator(name = "jpaSequence", sequenceName = "JPA_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jpaSequence")
    private int id;

    private Double xValue;
    private Double yValue;
    private Double rValue;
    private String hitResult;
    private String sessionId;

    public Entry() { }

    private boolean checkTriangle() {
         return xValue >= 0 && yValue <= 0 && ((yValue >= -rValue/2 + xValue/2) && (xValue <= rValue) && (yValue >= -rValue/2));
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionId() {
        return sessionId;
    }

    private boolean checkRectangle() {
        return xValue <= 0 && yValue >= 0 && xValue >= -rValue/2 && yValue <= rValue;
    }

    private boolean checkCircle() {
        return xValue <= 0 && yValue <= 0 && xValue*xValue + yValue*yValue <= (double)rValue*rValue/4;
    }

    public void checkHit() {
        hitResult = checkTriangle() || checkRectangle() || checkCircle() ? "Hit" : "Missed";
    }


    public Double getxValue() {
        return xValue;
    }


    public Double getyValue() {
        return yValue;
    }



    public Double getrValue() {
        return rValue;
    }

    public String getHitResult() {
        return hitResult;
    }

    public void setxValue(Double xValue) {
        this.xValue = xValue;
    }

    public void setyValue(Double yValue) {
        this.yValue = yValue;
    }

    public void setrValue(Double rValue) {
        this.rValue = rValue;
    }

    public void setHitResult(String hitResult) {
        this.hitResult = hitResult;
    }

    @Override
    public String toString() {
        return "Entry{" +
                "xValye=" + xValue +
                ", yValue=" + yValue +
                ", rValue=" + rValue +
                ", hitResult=" + hitResult +
                '}';
    }

    @Override
    public int hashCode() {
        return xValue.hashCode() + yValue.hashCode() +
                rValue.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj instanceof Entry) {
            Entry entryObj = (Entry) obj;
            return xValue.equals(entryObj.getxValue()) &&
                    yValue.equals(entryObj.getyValue()) &&
                    rValue.equals(entryObj.getrValue());
        }
        return false;
    }
}
