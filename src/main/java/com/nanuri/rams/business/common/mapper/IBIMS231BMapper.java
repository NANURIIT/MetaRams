package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;

@Mapper
public interface IBIMS231BMapper {

    /**
     * 결재요청내역 조회
     * @param paramData
     * @return
     */
	public List<IBIMS003BVO> apvlListChk (IBIMS231BDTO paramData);

    /**
     * 결재
     * @param paramData
     * @return
     */
	public int apvlRqst (IBIMS231BDTO paramData);

    /**
     * 승인요청중인 목록 상태관리
     * @param paramData
     * @return
     */
	public int updateDecd (IBIMS231BDTO paramData);

    /**
     * 결재일련번호 채번
     * @return
     */
    public int getDecdSn();

    /**
     * 결재일련번호 세팅용
     */
    public int decdSn(IBIMS231BDTO paramData);

    /**
     * 결재단계체크
     */
    public String chkDecdStep (IBIMS231BVO param);

}