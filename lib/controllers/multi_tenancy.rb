module Controllers
  module MultiTenancy

    extend ActiveSupport::Concern

    included do
      before_filter :setup_score
    end


    def default_url_options
      super.merge(score_id: ::MultiTenancy.current_score)
    end


    def setup_score
      ::MultiTenancy.collection_segments = ::MultiTenancy::COLLECTION_SEGMENTS

      @scores = Score.all

      score = params[:score_id] ? @scores.find(params[:score_id].to_s) : @scores.first
      ::MultiTenancy.current_score = score
    end
  end
end
