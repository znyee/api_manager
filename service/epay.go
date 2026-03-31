package service

import (
	"github.com/znyee/api_manager/setting/operation_setting"
	"github.com/znyee/api_manager/setting/system_setting"
)

func GetCallbackAddress() string {
	if operation_setting.CustomCallbackAddress == "" {
		return system_setting.ServerAddress
	}
	return operation_setting.CustomCallbackAddress
}

