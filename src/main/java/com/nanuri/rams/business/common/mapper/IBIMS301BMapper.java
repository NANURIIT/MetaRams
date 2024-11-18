package com.nanuri.rams.business.common.mapper;


import com.nanuri.rams.business.common.dto.IBIMS301BDTO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface IBIMS301BMapper {
	
	// 약정 및 해지정보 조회
	IBIMS301BDTO selectIBIMS301B(String paramData);
	// 약정 및 해지정보 등록
	int saveCtrcCclcInfo(IBIMS301BDTO paramData);
	// 약정 및 해지정보 수정
	int updateCtrcCclcInfo(IBIMS301BDTO paramData);
	
}
