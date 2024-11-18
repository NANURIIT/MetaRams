package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA06BDTO;
import com.nanuri.rams.business.common.vo.RAA06BVO;

@Mapper
public interface RAA06BMapper {

	List<RAA06BVO> getMrtgInfo(RAA06BVO mrtgInfo); // 담보정보 취득

	int registMrtgInfo(RAA06BDTO raa06bDTO); // 담보정보 생성

	int updateMrtgInfo(RAA06BDTO raa06bDTO); // 담보정보 갱신

	int deleteMrtgInfo(RAA06BVO mrtgInfo); // 담보정보 삭제

}