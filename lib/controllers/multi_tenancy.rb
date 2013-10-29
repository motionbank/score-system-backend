module Controllers
  module MultiTenancy

    extend ActiveSupport::Concern

    included do
      before_filter :setup_score
    end


    module ClassMethods
      def default_url_options(options = {})
        options[:score_id] = ::MultiTenancy.current_score
        options
      end
    end


    def setup_score
      ::MultiTenancy.collection_segments = ::MultiTenancy::COLLECTION_SEGMENTS

      score = params[:score_id] ? Score.find(params[:score_id].to_s) : Score.first
      ::MultiTenancy.current_score = score
    end
  end
end
