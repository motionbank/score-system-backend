locals ||= {}
locals[:object] ||= @cell

object locals[:object] => nil # the nil value means, don't wrap the object with its name

extends 'shared/cell'