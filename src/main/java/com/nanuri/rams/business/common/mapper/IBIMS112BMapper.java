package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS111BDTO;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.vo.IBIMS112BVO;
import com.nanuri.rams.business.common.vo.TB05030SVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface IBIMS112BMapper {

    int insert112B(List<IBIMS112BDTO> paramData);

    List<IBIMS112BVO> getCaseInfo(IBIMS112BDTO paramData);

    int delete112B(IBIMS111BDTO paramData);

    List<TB05030SVO> getCASEInfo(Map<String, Object> paramData);

    List<TB05030SVO> getIBDEALInfo(Map<String, Object> paramData);

    // 협의체 결의정보 업데이트
    int updateCNFRNCInfo(Map<String, Object> paramData);

	IBIMS112BVO getAppvCndt(IBIMS112BDTO param);

    public int updateMtrPrgSttsDcd (IBIMS112BDTO param);

}
