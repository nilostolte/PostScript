package com;

import java.awt.Color;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

@SuppressWarnings("serial")
public class Window  extends JFrame {
	   private ExclamationIcon exclamation_icon;
	   public Window() {
	      super("");
	      final int size = 32*12;
	      setSize(size,size);

	      setLocation(2,2);
	      setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	      //setLocationRelativeTo(null);
	      setResizable(false);
	      setUndecorated(true);
	      setBackground(new Color(0f, 0f, 0f, 0f));
	      exclamation_icon = new ExclamationIcon();
	      getContentPane().add(exclamation_icon); 
	   }

	   public static void main(String[] args) {
	      SwingUtilities.invokeLater(new Runnable() {
	         @Override
	         public void run() {
	            new Window().setVisible(true);
	         }
	      });
	   }
	}