using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamDonHangsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public SanPhamDonHangsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/SanPhamDonHangs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPhamDonHang>>> GetSanPhamDonHangs()
        {
            return await _context.SanPhamDonHangs.ToListAsync();
        }

        // GET: api/SanPhamDonHangs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPhamDonHang>> GetSanPhamDonHang(Guid id)
        {
            var sanPhamDonHang = await _context.SanPhamDonHangs.FindAsync(id);

            if (sanPhamDonHang == null)
            {
                return NotFound();
            }

            return sanPhamDonHang;
        }

        // PUT: api/SanPhamDonHangs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanPhamDonHang(Guid id, SanPhamDonHang sanPhamDonHang)
        {
            if (id != sanPhamDonHang.Id)
            {
                return BadRequest();
            }

            _context.Entry(sanPhamDonHang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamDonHangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SanPhamDonHangs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanPhamDonHang>> PostSanPhamDonHang(SanPhamDonHang sanPhamDonHang)
        {
            _context.SanPhamDonHangs.Add(sanPhamDonHang);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/SanPhamDonHangs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanPhamDonHang(Guid id)
        {
            var sanPhamDonHang = await _context.SanPhamDonHangs.FindAsync(id);
            if (sanPhamDonHang == null)
            {
                return NotFound();
            }

            _context.SanPhamDonHangs.Remove(sanPhamDonHang);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("deletesanphambyidsanpham/{idSanPham}/{idDonHang}/{kichCo}/{mau}")]
        public IActionResult DeleteSanPhamByIdSanPham(string idSanPham, string idDonHang, double kichCo, int mau)
        {
            var sanPhamDonHang = _context.SanPhamDonHangs
            .Where(spdh => spdh.DonHangId.ToString() == idDonHang 
            && spdh.SanPhamId.ToString() == idSanPham
            && spdh.KichCo == kichCo
            && spdh.Mau == mau
            ).FirstOrDefault();

            if (sanPhamDonHang == null)
            {
                return NotFound(); // Trả về NotFound nếu không tìm thấy đối tượng để xóa
            }

            _context.SanPhamDonHangs.Remove(sanPhamDonHang);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut("suasanphamdonhang/{idSanPham}/{idDonHang}/{kichCo}/{mau}")]
        public IActionResult SuaSanPhamDonHang(string idSanPham, string idDonHang, double kichCo, int mau)
        {
            var sanPhamDonHang = _context.SanPhamDonHangs
            .Where(spdh => spdh.DonHangId.ToString() == idDonHang
            && spdh.SanPhamId.ToString() == idSanPham
            && spdh.KichCo == kichCo
            && spdh.Mau == mau
            ).FirstOrDefault();

            if (sanPhamDonHang == null)
            {
                return NotFound(); // Trả về NotFound nếu không tìm thấy đối tượng để xóa
            }

           var query = _context.SanPhamKichCos.Where(x => x.SanPhamId.ToString() == idSanPham && x.KichCo == kichCo && x.Mau == mau).FirstOrDefault();
            if (query != null)
            {
                query.SoLuong += sanPhamDonHang.SoLuong;
                _context.Entry(query).State = EntityState.Modified;
                _context.SaveChanges();
            }
            


            return NoContent();
        }

        [HttpGet("getlistsanphambyiddonhang/{idDonHang}/{accountId}")]
        public IActionResult GetMaGiamGiaByAccount(string idDonHang, string accountId)
        {
            var query = from sdh in _context.SanPhamDonHangs
                         join sp in _context.SanPhams on sdh.SanPhamId equals sp.Id
                         where sdh.DonHangId.ToString() == idDonHang
                        select new
                         {
                             donHangId = sdh.DonHangId,
                             SanPhamId = sp.Id,
                             soLuong = sdh.SoLuong,
                             kichCo = sdh.KichCo,
                             mau = sdh.Mau,
                             ten = sp.Ten,
                             gia = sp.Gia,
                             isDanhGia = _context.DanhGia.Any(dg =>
                                  dg.AccountId.ToString() == accountId &&
                                  dg.SanPhamId == sp.Id &&
                                  dg.KichCo == sdh.KichCo &&
                                  dg.Mau == sdh.Mau &&
                                  dg.DonHangId.ToString() == idDonHang),
                            giaSauGiam = sp.GiaSauGiam,
                             duongDanAnh = sp.DuongDanAnh
                         };

            return Ok(query.ToList());
        }

        private bool SanPhamDonHangExists(Guid id)
        {
            return _context.SanPhamDonHangs.Any(e => e.Id == id);
        }
    }
}
