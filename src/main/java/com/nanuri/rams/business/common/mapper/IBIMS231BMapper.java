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
     * 결재승인자체크
     */
    public String chkDcfcEno (IBIMS231BVO param);

    /**
     * 승인요청그리드 조회
     */
    public List<IBIMS231BVO> inqTB06080S (IBIMS231BDTO paramData);


    /**
     * 최종결재순번 확인
     */
    public int getLastDecdSq (int paramData);

    /**
     * 오늘의 할일
     */
    public List<IBIMS231BVO> todayWorks ( String param );

    /**
     * 결재단계체크
     */
    public int chkDecdStep ( IBIMS231BDTO param );

    /**
     * 일하러가는 화면명과 조회 키값
     */
    public IBIMS231BDTO justWork ( IBIMS231BDTO param );
}