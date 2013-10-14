# encoding: utf-8

# some controller helpers concerning resources
#
module ResourceHelper

  # gets the underscored name of strings, instances, classes
  def underscored_name(item)
    if item.is_a?(String)
      item_name = item.singularize.underscore
    else
      item_name = item.is_a?(Class) ? item : item.class
      item_name.to_s.singularize.underscore
    end
  end


  def view_dir_for(resource)
    underscored_name(resource).pluralize
  end


  # TODO this is not complete, but that's all we need right now.
  def partial_name
    %w(new create edit update).include?(action_name) ? '_form' : ''
  end

end
