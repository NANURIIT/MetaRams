package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS104BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;

@Mapper
public interface IBIMS104BMapper {

	List<IBIMS104BDTO> getDocInfo(IBIMS104BDTO docInfo);

	int deleteDocInfo(IBIMS104BDTO docInfo);

	int updateDocInfo(IBIMS104BDTO docInfo);

	int registDocInfo(IBIMS104BDTO docInfo);

	int updateLastDcmYn(IBIMS104BDTO docInfo);

}
