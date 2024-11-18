package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS111BDTO;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.vo.IBIMS111BVO;
import com.nanuri.rams.business.common.vo.RAA21BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IBIMS111BMapper {
    public int saveIBIMS111BInfo(IBIMS111BDTO param);

    public void insert111B(IBIMS111BDTO paramData);

    public IBIMS111BVO getLastCNFRNCInfo(IBIMS111BDTO paramData);

    public List<IBIMS111BVO> getCNFRNCList(IBIMS111BDTO paramData);

    public IBIMS111BVO getCNFRNCInfo(IBIMS111BDTO paramData);

    public int updatePrgSttsDcd(IBIMS111BDTO paramData);

    public int delete111B(IBIMS111BDTO paramData);

    public IBIMS111BVO getWorkflowDetail(IBIMS111BVO param);
}
