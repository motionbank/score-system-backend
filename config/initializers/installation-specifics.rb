# FRONTEND_URL_TEMPLATE = "http://scores.wp10610991.server-he.de/".freeze
# FRONTEND_URL_TEMPLATE = "http://localhost:3331/%{score_id}/public/#set/%{set_id}".freeze
FRONTEND_URL_BASE = "http://scores.motionbank.org/pba/%{score_id}".freeze
FRONTEND_URL_TEMPLATE = "#{FRONTEND_URL_BASE}/#set/%{set_id}".freeze
