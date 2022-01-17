package beans;

public class Result {
    private String result;
    private String x;
    private String y;
    private String r;
    private String executeTime;
    private String currentTime;

    public Result(String result, String x, String y, String r, String executeTime, String currentTime) {
        this.result = result;
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.executeTime = executeTime;
    }


    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
    }

    public String getResult() {
        return result;
    }

    public String getExecuteTime() {
        return executeTime;
    }

    public String getCurrentTime() {
        return currentTime;
    }
}
