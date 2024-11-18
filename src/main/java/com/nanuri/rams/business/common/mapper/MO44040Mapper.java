package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.MO44040SVO;

@Mapper
public interface MO44040Mapper {

	List<MO44040SVO.DealInfo> getSellDownList(MO44040SVO.SearchParam searchParam);

	List<MO44040SVO.DealInfo> getEtcList(MO44040SVO.SearchParam searchParam);

}
