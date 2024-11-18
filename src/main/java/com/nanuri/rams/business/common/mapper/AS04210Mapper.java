package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AS04210SVO.CASEInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.MMBRInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;

@Mapper
public interface AS04210Mapper {

	List<CASEInfo> searchCNFRNC(SearchVO paramData);

	List<MMBRInfo> getMMBRInfoAS04210(SearchVO paramData);

	List<IBDEALInfo> getIBDEALInfo(SearchVO paramData);

	// 안건 정보 UPDATE
	int updateIBDEALInfo(IBDEALInfo param);

	// 셀다운 정보 INSERT
	int insertSndCndt(IBDEALInfo param);

	// 셀다운 정보 DELETE
	int deleteSndCndt(IBDEALInfo param);

	// 기타 정보 INSERT
	int insertEtcCndt(IBDEALInfo param);

	// 셀다운 정보 DELETE
	int deleteEtcCndt(IBDEALInfo param);


}
