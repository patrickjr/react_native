package com.reachability;

import java.net.Socket;
import java.net.SocketAddress;
import java.net.InetSocketAddress;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Created by pjr on 1/19/16.
 */

public class ReachabilityManager {
    private String host;
    private int port;
    private InetAddress hostInetAddress;
    private static final String http = "http://";
    private static final String https = "https://";


    public ReachabilityManager(String host) {
        this.port = 80;
        this.host = formatHostString(host.toLowerCase());
        try {
            this.hostInetAddress = InetAddress.getByName(this.host);
        }catch (UnknownHostException e){
            System.out.println(e);
            this.hostInetAddress = null;
        }
    }
    public String getHost() {
        return this.host;
    }

    public int getPort(){
        return this.port;
    }

    public boolean isHostAvailable(){
        if (this.hostInetAddress == null){
            return false;
        }
        return isHostAvailable(this.hostInetAddress, this.port);
    }
    public boolean isHostAvailable(InetAddress ip, int port){

        boolean exists = false;

        try {
            SocketAddress sockaddr = new InetSocketAddress(ip, port);
            Socket sock = new Socket();
            int timeoutMs = 2000;   // 2 seconds
            sock.connect(sockaddr, timeoutMs);
            exists = true;
        }catch(Exception e){
            
        }

        return exists;
    }


    // port's default number is 80, formatHostString will modify that value if specified in the
    // host string provided for this method
    // example, localhost:3000
    // would change the host to "localhost" and port to 3000
    private String formatHostString(String host){
        String tempHost = host;
        if (tempHost.length() < 1)
          return "";
        if (tempHost.startsWith(this.http) && tempHost.length() > this.http.length()){
            tempHost = tempHost.replaceAll(this.http, "");
        }
        if (tempHost.startsWith(this.https) && tempHost.length() > this.https.length()){
            tempHost = tempHost.replaceAll(this.https, "");
        }
        // check if string is in the format of
        // localhost:3000 (valid)       -> change this.port
        // localhost:300hdsf(invalid)   -> keep this.port at default
        if (tempHost.contains(":")){
            if (countOccurrences(tempHost, ':') > 1){
                return tempHost;
            }
            int index = tempHost.indexOf(":");
            String portNumber = tempHost.substring(index+1, tempHost.length());
            if (portNumber.matches("^[0-9]*$")){
                this.port = Integer.parseInt(portNumber);
                return tempHost.substring(0, index);
            }
            return tempHost;
        }
        return tempHost;
    }
    public static int countOccurrences(String haystack, char needle){
        int count = 0;
        for (int i=0; i < haystack.length(); i++) {
            if (haystack.charAt(i) == needle) {
                count++;
            }
        }
        return count;
    }

}
