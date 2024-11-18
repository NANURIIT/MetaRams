package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import com.nanuri.rams.business.common.vo.IBIMS405BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IBIMS405BMapper {

	// 기타투자정보(매수) SELECT
	public List<IBIMS405BVO> getBuyList(IBIMS405BDTO paramData);

	// 기타투자정보(매수) SELECT
	public int getTrSn(IBIMS405BDTO paramData);

	// 기타투자정보(매수) INSERT
	public int saveBuyInfo(IBIMS405BDTO param);

	// 기타투자정보(배당금) INSERT
	public int saveDvdnInfo(IBIMS405BDTO paramData);

	// // 배당금 DELETE
	// public int cancelDvdnList(IBIMS405BDTO paramData);

	// 기타투자정보(매수) DELETE
	public int cancelBuyInfo(IBIMS405BDTO param);


}
