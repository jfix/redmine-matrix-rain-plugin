
class MatrixRainKonamiHookListener < Redmine::Hook::ViewListener
  render_on :view_layouts_base_body_bottom, :partial => "matrix_rain_konami/matrix-rain-konami" 
end