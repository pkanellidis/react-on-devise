# frozen_string_literal: true

module JsonResponseHelper

  def json(data:, message: , errors: nil, status: )
    render json: {
      data: data,
      message: message,
      errors: errors
    }, status: status
  end

  def json_error(data: {}, errors:, status:)
    json(data: data, errors: errors, status: status, message: nil)
  end

  def json_success(data: {}, message: nil, status: :success)
    json(data: data, message: message, status: status)
  end

end