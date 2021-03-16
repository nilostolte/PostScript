package com; 

import java.awt.geom.Path2D;
import java.awt.geom.AffineTransform;
import java.awt.Graphics2D;
import java.awt.Color;
import java.awt.Paint;
import java.awt.RadialGradientPaint;
import java.awt.RenderingHints;
import java.awt.Graphics;
import java.awt.geom.Point2D;

import javax.swing.JPanel;

@SuppressWarnings("serial")
class ExclamationIcon extends JPanel {

   public final double sca = 12.;

   static private Color exclam_color = new Color(0.8627f, 0.0784f, 0.2353f);
   static public Color get_color() { return exclam_color; }
   static private Path2D.Float  white_circle_path = white_circle();
   static private Path2D.Float exclam_path = exclam();
   static private Path2D.Float color_ring_path = color_ring();
   static private Path2D.Float white_circle() {
      Path2D.Float p = new Path2D.Float();
      p.moveTo(31.8f,16.0f);
      p.curveTo(31.8f,7.27974f,24.7203f,0.2f,16.0f,0.2f);
      p.curveTo(7.27974f,0.2f,0.2f,7.27974f,0.2f,16.0f);
      p.curveTo(0.2f,24.7203f,7.27974f,31.8f,16.0f,31.8f);
      p.curveTo(24.7203f,31.8f,31.8f,24.7203f,31.8f,16.0f);
      return p;
   }
   static private Path2D.Float color_ring() {
      Path2D.Float p = new Path2D.Float();
      p.moveTo(32f,16.0f);
      p.curveTo(32f,7.16936f,24.8306f,0f,16.0f,0f);
      p.curveTo(7.16936f,0f,0f,7.16936f,0f,16.0f);
      p.curveTo(0f,24.8306f,7.16936f,32f,16.0f,32f);
      p.curveTo(24.8306f,32f,32f,24.8306f,32f,16.0f);
      p.moveTo(29f,16.0f);
      p.curveTo(29f,23.1749f,23.1749f,29f,16.0f,29f);
      p.curveTo(8.8251f,29f,3f,23.1749f,3f,16.0f);
      p.curveTo(3f,8.8251f,8.8251f,3f,16.0f,3f);
      p.curveTo(23.1749f,3f,29f,8.8251f,29f,16.0f);
      return p;
   }
   static private Path2D.Float exclam() {
      Path2D.Float p = new Path2D.Float();
      p.moveTo(13.816f,7.68f);
      p.curveTo(13.719f,7.68f,13.641f,7.813f,13.641f,7.969f);
      p.lineTo(14.438f,18.801f);
      p.curveTo(14.438f,18.957f,14.52f,19.086f,14.613f,19.086f);
      p.curveTo(14.613f,19.086f,15.246f,19.098f,15.766f,19.086f);
      p.curveTo(15.938f,19.086f,15.988f,19.102f,16.145f,19.086f);
      p.curveTo(16.664f,19.098f,17.293f,19.086f,17.293f,19.086f);
      p.curveTo(17.391f,19.086f,17.469f,18.957f,17.469f,18.801f);
      p.lineTo(18.27f,7.969f);
      p.curveTo(18.27f,7.813f,18.188f,7.703f,18.094f,7.703f);
      p.lineTo(16.156f,7.703f);
      p.curveTo(16.148f,7.703f,16.152f,7.68f,16.145f,7.68f);
      p.closePath();
      p.moveTo(17.715f,22.543f);
      p.curveTo(17.715f,23.496f,16.941f,24.27f,15.988f,24.27f);
      p.curveTo(15.031f,24.27f,14.258f,23.496f,14.258f,22.543f);
      p.curveTo(14.258f,21.59f,15.031f,20.816f,15.988f,20.816f);
      p.curveTo(16.941f,20.816f,17.715f,21.59f,17.715f,22.543f);
      return p;
   }
   static private float[] ring_shade_radii = { 0.8125f, 1f };
   static private Color[] ring_shade_colors = { new Color(0.8627f, 0.0784f, 0.2353f), new Color(255, 0, 0) };
   static private Paint ring_shade[] = {
      new RadialGradientPaint( new Point2D.Float(16f, 16f), 16f, ring_shade_radii, ring_shade_colors)
   };
   public void paintComponent(Graphics g1) {
      Graphics2D g = (Graphics2D) g1;
      g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);      AffineTransform matrix;
      matrix = g.getTransform();
      g.scale(sca, sca);
      g.setColor(Color.white);
      g.fill(white_circle_path);
      g.setPaint(ring_shade[0]);
      g.fill(color_ring_path);
      g.setColor(exclam_color);
      g.fill(exclam_path);
      g.setTransform(matrix);
   }
}
