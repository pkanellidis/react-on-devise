# frozen_string_literal: true

module JsonRespondable

  def json(data:, message: , errors: nil, status: )
    render json: {
      data: data,
      message: message,
      errors: errors
    }, status: status
  end

  def json_error(data: nil, errors:, status:)
    errors = errors.is_a?(Array) ? errors : [errors]
    json(data: data, errors: errors, status: status, message: nil)
  end

  def json_success(data: nil, message: nil, status: :ok)
    json(data: data, message: message, status: status)
  end

end