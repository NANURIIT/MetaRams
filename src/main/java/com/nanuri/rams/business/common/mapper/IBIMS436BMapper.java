package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.vo.IBIMS810BVO;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface IBIMS436BMapper {

   /**
     * 딜일별잔액(IBIMS810B)에서 연체내역 조회
     * @param param IBIMS436BVO (기준일자 및 조회 조건 포함)
     * @return 연체 내역 리스트 (810 테이블에서 가져온 데이터)
     */
    List<IBIMS810BVO> getOvduList(IBIMS810BVO param);


    /**
     * 연체 확정 여부 업데이트
     * @param param IBIMS436BVO
     * @return 업데이트된 행 수
     */
    int saveDcsn(IBIMS436BVO param);

    /**
     * 딜일별잔액에서 연체내역 조회
     * @param param IBIMS810BVO
     * @return 연체 내역 리스트
     */
    List<IBIMS436BVO> getOvduDtls(IBIMS436BVO param);

    /**
     * 기존 연체 데이터 조회
     * @param param IBIMS436BVO
     * @return 연체 내역 리스트
     */
    List<IBIMS436BVO> getResistedOvduList(IBIMS436BVO param);

     /**
     * 연체 데이터를 다건 등록 (배치 인서트)
     * @param ovduList 연체 내역 리스트
     * @return 삽입된 행 수
     */
    int batchInsert(IBIMS810BVO param);

    /**
     * 연체기본내역(원금/이자) 조회 (TB07030 상환)
     * @param param 연체기본 IBIMS436B
     * @return 연체기본내역
     */
    public List<IBIMS436BVO> getPrnaOvduBscList(IBIMS436BVO param);//원금연체
    public List<IBIMS436BVO> getIntrOvduBscList(IBIMS436BVO param);//이자연체

    /**
     * 연체기본내역 플래그 변경
     * @param param 연체기본 IBIMS436B
     * @return 
     */
    public int ovduSttsCdFlagCng(IBIMS436BVO param);
}
